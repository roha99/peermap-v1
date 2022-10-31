<script>

  import Map from './lib/Map.svelte';
  import Marker from './lib/Marker.svelte';

  import Login from './lib/Login.svelte';
  import Logout from './lib/Logout.svelte';

  let state = false;

</script>

<main>

  <Map>

    <Marker lat={40} lng={-3}></Marker>
    <Marker lat={60} lng={10}></Marker>

    <div class="leaflet-top leaflet-right">

      {#if state}
      
        <Logout bind:state={state}/>

      {:else}
        
        <Login bind:state={state}/>

      {/if}
      
    </div>

    <div class="leaflet-bottom leaflet-left">
      
      {#if state}

        <h4 class="leaflet-control">yaaas</h4>
        
      {/if}

    </div>

  </Map>

</main>

<style>

</style>