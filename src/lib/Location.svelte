<script>

  import { getContext } from 'svelte';
	import { circle } from 'leaflet';
  import { user } from './initGUN';

  const { getMap } = getContext('leaflet');
	const map = getMap();

  let c = circle();

  map.on('locationfound',locationfound);

  function locate () {
    map.locate({setView: true, maxZoom: 16});
  }

  function locationfound (e) {
    // add to map
    if (map.hasLayer(c)) map.removeLayer(c);
    c = circle(e.latlng,e.accuracy);
    c.addTo(map);
    // put to GUN
    let ref = user.get('location');
    ref.put({
      lat : e.latlng.lat,
      lng : e.latlng.lng,
      accuracy : e.accuracy,
    });
  }

  locate();

</script>

<button class="leaflet-control leaflet-bar" on:click={locate}>relocate</button>