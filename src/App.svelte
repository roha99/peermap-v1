<script>

  import Map from './lib/Map.svelte';
  import Login from './lib/Login.svelte';
  import Logout from './lib/Logout.svelte';
  import Friends from './lib/Friends.svelte';
  import Location from './lib/Location.svelte';

  let state = false;

</script>

<main>

  <Map>
    
    <div class="leaflet-top leaflet-right">

      {#if state}
      
        <Logout bind:state={state}/>

      {:else}
        
        <Login bind:state={state}/>

      {/if}
      
    </div>

    <div class="leaflet-bottom leaflet-left">
      
      {#if state}

        <Friends/>
        
      {/if}

    </div>

    <div class="leaflet-bottom leaflet-right">

      {#if state}
      
        <Location/>
        
      {/if}

    </div>

  </Map>

</main>

<style>

</style>