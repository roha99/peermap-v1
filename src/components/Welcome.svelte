<script>

  import { user,gun } from '../initGUN';

  export let auth;

  gun.on('auth',()=>auth=true); // necessary to automatically sign in after page refresh

  let username,password;

  function sign_up () {
    user.create(username, password, ack => {
      if (ack.err) {
        alert(ack.err);
      } else {
        sign_in();
      }
    });
  }

  function sign_in () {
    user.auth(username, password, ack => {
      if (ack.err) {
        alert(ack.err);
      } else {
        auth = true;
      }
    });
  }

</script>

<div class="flex flex-col w-screen h-screen justify-center items-center gap-4">
  
  <img class="w-44" src="peer.svg" alt="PeerMap">

  <div class="text-4xl">welcome home</div>

  <input class="input" bind:value={username} type="text" placeholder="user">
  <input class="input" bind:value={password} type="password" placeholder="password">

  <button class="button" on:click={sign_in}>sign in</button>
  <button class="button" on:click={sign_up}>sign up</button>

</div>