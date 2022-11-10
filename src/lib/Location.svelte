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
    c.bindPopup(String(user.is.alias));
    c.addTo(map);
    // put to GUN
    let lat = user.get('lat');
    let lng = user.get('lng');
    let accuracy = user.get('accuracy');
    lat.put(e.latlng.lat);
    lng.put(e.latlng.lng);
    accuracy.put(e.accuracy);
    // location.put({
    //   lat : e.latlng.lat,
    //   lng : e.latlng.lng,
    //   accuracy : e.accuracy,
    // });
  }

  locate();

</script>

<button class="leaflet-control leaflet-bar" on:click={locate}>relocate</button>