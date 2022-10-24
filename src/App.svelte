<script>

  import Map from './lib/Map.svelte';
  import Marker from './lib/Marker.svelte';

</script>

<main>

  <Map>
    <Marker lat={40} lng={-3}></Marker>
    <Marker lat={60} lng={10}></Marker>
  </Map>

</main>

<style>
  
</style>