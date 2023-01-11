<script>

	import { gun,user } from '../initGUN';

	let f,store = {};
	const ref = user.get('friends');
	$: friends = Object.entries(store);

	// subscribe to friends
	ref.map().on((friend,key) => {
		if (friend) {
			store[key] = {
				alias : friend.alias,
				pub : friend.pub,
				mutual : false,
			};
			gun.user(friend.pub).get('friends').once(f => {
				if (f[user._.soul]) store[key].mutual = true;
			});
    } else {
			// .map() can return null for deleted data
			delete store[key];
			store = store;
    }
	});

	const add = () => {
		if (f) {
			gun.user(f).once(friend => {
				if (friend) {
					ref.set(friend);
				} else {
					alert('friend not found - please try again');
				}
			});
			f = undefined;
		}
	};

	const remove = key => ref.get(key).put(null);

</script>

<div class="content">

	<div class="box">
		
		<input class="input" bind:value={f} type="text" placeholder="public key">
		<button class="button" on:click={add}>add friend</button>

	</div>

	{#each friends as [key,friend]}
	
		<div class="flex flex-col box gap-4">

			<div class="flex flex-row gap-4">

				<div class="text-2xl w-fit p-4 border-2 border-black bg-teal-400">
					{friend.alias}
				</div>

				{#if friend.mutual}
					<div class="text-6xl">&#129309</div>
				{/if}

			</div>


			<div class="break-all w-fit p-4 border-2 border-black bg-teal-400">
				{friend.pub}
			</div>

			<button class="button w-fit" on:click={()=>remove(key)}>remove</button>

		</div>

	{/each}

</div>