<script>

  import { getContext } from 'svelte';
  import { user } from './initGUN';
  import Marker from './Marker.svelte';

  const { getMap } = getContext('leaflet');
	const map = getMap();

  let lat = user.get('lat');
  let lng = user.get('lng');
  let accuracy = user.get('accuracy');

  map.on('locationfound',locationfound);

  function locate () {
    map.locate({setView: true, maxZoom: 16});
  }

  function locationfound (e) {
    // put to GUN
    lat.put(e.latlng.lat);
    lng.put(e.latlng.lng);
    accuracy.put(e.accuracy);
  }

  locate();

</script>

<button class="leaflet-control leaflet-bar" on:click={locate}>relocate</button>

{#if $lat && $lng && $accuracy}

  <Marker lat={$lat} lng={$lng} accuracy={$accuracy} color=green alias={user.is.alias}/>

{/if}