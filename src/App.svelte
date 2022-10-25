<script>

  import Map from './lib/Map.svelte';
  import Marker from './lib/Marker.svelte';

  import { username,sign_up,sign_in,sign_out } from './lib/gun';

  let user;
  let pass;

</script>

<main>

  <Map>

    <Marker lat={40} lng={-3}></Marker>
    <Marker lat={60} lng={10}></Marker>

    <div class="leaflet-top leaflet-right">

      {#if $username}
      
        <button class="leaflet-control" on:click={sign_out}>sign out</button>

      {:else}
        
        <input class="leaflet-control" bind:value={user} type="text" placeholder="user">
        <input class="leaflet-control" bind:value={pass} type="password" placeholder="password">

        <button class="leaflet-control" on:click={() => sign_in(user,pass)}>sign in</button>
        <button class="leaflet-control" on:click={() => sign_up(user,pass)}>sign up</button>

      {/if}
      
    </div>

  </Map>

</main>

<style>

</style>