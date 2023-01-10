<script>
	
	import { gun,user } from '../initGUN';

	const ref = user.get('friends');
	let store = {};
	
	ref.map().on(async (data, key) => {
		if (data) {
			let tmp = {
				alias : data.alias,
				pub : data.pub,
			};
			store[key] = tmp;
    } else {
			// gun.map() can return null (deleted) values for keys
			// if so, this else clause will update your local variable
			delete store[key]
			store = store;
    }
	})

	$: cats = Object.entries(store);

	const friends = ref.map();
	let f;

	const add = () => {
		if (f) {
			gun.user(f).once((friend) => {
				if (friend) {
					ref.set(friend);
				} else {
					alert('friend not found - please try again');
				}
			});
			f = undefined;
		}
	};

	// other "write" actions
	const remove = key => ref.get(key).put(null); // seems broken

</script>

<div class="content">

	<div class="box">
		
		<input class="input" bind:value={f} type="text" placeholder="public key">
		<button class="button" on:click={add}>add friend</button>

	</div>

	{#each $friends as [key,friend]}
	
		<div class="flex flex-col box gap-4">

			<div class="text-2xl w-fit p-4 border-2
			border-black
			bg-teal-400">{friend.alias}</div>
			<div class="break-all w-fit p-4 border-2
			border-black
			bg-teal-400">{friend.pub}</div>

			<button class="button w-fit" on:click={()=>remove(key)}>remove</button>

			{JSON.stringify(friend)}

		</div>

	{/each}

	{#each cats as [key,friend]}
	
		<div class="flex flex-col box gap-4">

			<div class="text-2xl w-fit p-4 border-2
			border-black
			bg-teal-400">{friend.alias}</div>
			<div class="break-all w-fit p-4 border-2
			border-black
			bg-teal-400">{friend.pub}</div>

			<button class="button w-fit" on:click={()=>remove(key)}>remove</button>

			{JSON.stringify(friend)}

		</div>

	{/each}

</div>