<script>
  import { user } from "./initGUN";

  export let state;

  function sign_out () {
    user.leave();
    state = false;
  }
</script>

<button class="leaflet-control leaflet-bar" on:click={sign_out}>sign out</button>
<h4 class="leaflet-control">{user.is.alias} : <button class="leaflet-bar" on:click={() => navigator.clipboard.writeText(user.is.pub)}>{user.is.pub}</button></h4>