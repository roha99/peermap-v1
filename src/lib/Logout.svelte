<script>
  import { user } from "./initGUN";

  export let state;

  function sign_out () {
    user.leave();
    state = false;
  }
</script>

<button class="leaflet-control leaflet-bar" on:click={sign_out}>sign out</button>