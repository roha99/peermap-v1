<script>
  import { user } from './initGUN';

  export let state;

  // gun.on('auth',()=>state=true);

  let u,p;

  function sign_up (u,p) {
    user.create(u, p, (ack) => {
      if (ack.err) {
        alert(ack.err);
      } else {
        sign_in(u,p);
      }
    });
  }

  function sign_in (u,p) {
    user.auth(u, p, async (ack) => {
      if (ack.err) {
        alert(ack.err);
      } else {
        state = true;
      }
    });
  }
</script>

<input class="leaflet-control leaflet-bar" bind:value={u} type="text" placeholder="user">
<input class="leaflet-control leaflet-bar" bind:value={p} type="password" placeholder="password">

<button class="leaflet-control leaflet-bar" on:click={() => sign_in(u,p)}>sign in</button>
<button class="leaflet-control leaflet-bar" on:click={() => sign_up(u,p)}>sign up</button>