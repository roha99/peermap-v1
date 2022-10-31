<script>

  import { gun,user } from './initGUN';
  import Marker from './Marker.svelte';

	const ref = user.get('friends');
	let store = {}; // create a local store to cache data from GUN
	let f;

	// create a listener that iterates over keys found in the "friends" node
	ref.map().on( (friend,key) => {
		if (friend) {
			// update the store with the new value
			store[key] = friend;
			// get and set the location for each friend
			gun.get(friend.location).once(loc => {
				store[key].location = loc;
			});
		} else {
			// a key may contain a null value (if data has been deleted or set to null)
			// if so, we remove the item from the store
			delete store[key];
			store = store;
		}
	})

	function add () {
		if (f) {
			gun.user(f).once((friend) => {
				if (friend) {
					ref.set(friend);
				}
			});
			f = undefined;
		}
	}

  $: friends = Object.entries(store);

	// other "write" actions
	const remove = key => ref.get(key).put(null);

</script>

{#each friends as [key,friend]}

	<h4 class="leaflet-control ">{friend.alias} : {friend.pub} <button class="leaflet-bar" on:click={()=>remove(key)}>remove</button></h4>
	
	{#if friend.location.lat && friend.location.lng}
		<Marker lat={friend.location.lat} lng={friend.location.lng} alias={friend.alias}/>
	{/if}

{/each}

<input class="leaflet-control leaflet-bar" bind:value={f} type="text" placeholder="friend">
<button class="leaflet-control leaflet-bar" on:click={add}>add</button>