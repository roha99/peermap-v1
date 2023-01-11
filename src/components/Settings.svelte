<script>

  import { gun,user } from "../initGUN";

  export let auth;

  let peers = gun.back('opt.peers');

  let alias = user.get('alias');
  let key = user.get('pub');

  function sign_out () {
    user.leave();
    auth = false;
  }

  $: entries = Object.keys(peers);

</script>

<div class="content">

  <div class="box break-all">

    {$alias} : {$key}

    <button class="button" on:click={sign_out}>sign out</button>

  </div>

  <div class="box">

    {#each entries as entry}
      {entry}<br>
    {/each}

    {Object.keys(peers).length}

  </div>

</div>
