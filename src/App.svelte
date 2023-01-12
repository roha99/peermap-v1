<script>

  import Welcome from './components/Welcome.svelte';
  import Navigation from './components/Navigation.svelte';
  import Friends from './components/Friends.svelte';
  import Map from './components/Map.svelte';
  import Settings from './components/Settings.svelte';

  let auth = false;
  let route = 'map';

</script>

{#if auth}

  <div class="flex flex-col-reverse sm:flex-row h-screen overscroll-none">

    <Navigation bind:route={route}/>

    {#if route == 'friends'}

      <Friends/>

    {/if}

    {#if route == 'map'}

      <Map/>

    {/if}

    {#if route == 'settings'}

      <Settings bind:auth={auth}/>

    {/if}

  </div>

{:else}

  <Welcome bind:auth={auth}/>

{/if}