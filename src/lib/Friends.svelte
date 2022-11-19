<script>

  import { gun,user } from './initGUN';
  import Marker from './Marker.svelte';

	const ref = user.get('friends');
	const friends = ref.map();
	let f;

	const add = () => {
		if (f) {
			gun.user(f).once((friend) => {
				if (friend) {
					ref.set(friend);
				}
			});
			f = undefined;
		}
	};

	// other "write" actions
	const remove = key => ref.get(key).put(null); // seems broken

</script>

{#each $friends as [key,friend]}

	<h4 class="leaflet-control">
		{friend.alias} : {friend.pub}
		<button class="leaflet-bar" on:click={()=>remove(key)}>remove</button>
	</h4>

	{#if friend.lat && friend.lng && friend.accuracy}
		<Marker
			bind:lat={friend.lat}
			bind:lng={friend.lng}
			bind:accuracy={friend.accuracy}
			bind:alias={friend.alias}
			color=red
		/>
	{/if}

{/each}

<input class="leaflet-control leaflet-bar" bind:value={f} type="text" placeholder="friend">
<button class="leaflet-control leaflet-bar" on:click={add}>add</button>