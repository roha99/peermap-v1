<script>

  import { gun,user } from "../initGUN";

  export let auth;

  const peers = gun.back('opt.peers');
  const alias = user.get('alias');
  const pub = user.get('pub');

  function sign_out () {
    user.leave();
    auth = false;
  }

  $: keys = Object.keys(peers);

</script>

<div class="content">

  <div class="flex flex-col box gap-4">

    <div class="text-2xl w-fit p-4 border-2 border-black bg-teal-400">
      {$alias}
    </div>

    <div class="break-all w-fit p-4 border-2 border-black bg-teal-400">
      {$pub}
    </div>

    <button class="button w-fit" on:click={sign_out}>sign out</button>

  </div>

  <div class="box">

    <div class="text-xl font-bold">you are connected to {keys.length} peer(s)</div>

    {#each keys as key}
      <div>{key}</div>
    {/each}

  </div>

</div>