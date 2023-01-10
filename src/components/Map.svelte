<script>

  import { gun,user } from '../initGUN';
  import { onMount } from 'svelte';
  import { map,tileLayer,circle } from 'leaflet';

  // --- map stuff --- >
  let container,MAP;
  onMount(() => {
    MAP = map(container,{
      zoomControl : false,
      attributionControl : false,
      worldCopyJump : true,
      // maxBoundsViscosity : 1,
      // maxBounds : bounds,
    });
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(MAP);
    MAP.on('locationfound',location_found);
    MAP.fitWorld();
  });

  // --- gerneral location stuff --- >
  const identity = user._.sea; // cryptographic identity of user
  let alias; user.get('alias').once(a => alias = a); // alias of user
  const location = user.get('location'); // reference to location
  const friends = user.get('friends'); // reference to friends
  const locate = () => MAP.locate({setView:true});
  // const remove = () => location.put(null);

  // --- marker stuff --- >
  const markers = {};
  async function set (pub,location,secret,color,alias) {
    if (location && location[identity.pub]) {
      const data = await SEA.decrypt(location[identity.pub],secret);
      if (markers[pub]) {
        markers[pub]
        .setLatLng([data.latitude,data.longitude])
        .setRadius(data.accuracy);
      } else {
        markers[pub] = circle(
          [data.latitude,data.longitude],
          {radius:data.accuracy,color:color},
        )
        .bindPopup(alias)
        .addTo(MAP);
      }
    } else if (markers[pub]) {
      MAP.removeLayer(markers[pub]);
      markers[pub] = null;
    }
  }

  // --- subscribe to location of user --- >
  location.on(location => set(identity.pub,location,identity,'green',alias));

  // --- subscribe to locations of friends --- >
  friends.map().once(friend => {
    // get location of friend
    gun.user(friend.pub).get('location').on(async location => {
      const secret = await SEA.secret(friend.epub,identity);
      set(friend.pub,location,secret,'red',friend.alias);
    });
  });

  // --- set location --- >
  async function location_found (e) {
    // delete old location data from GUN
    location.put(null);
    // create new location object
    const loc = {
      latitude : e.latitude,
      longitude : e.longitude,
      accuracy : e.accuracy,
    };
    // encrypt and save for user
    const data = await SEA.encrypt(loc,identity);
    location.get(identity.pub).put(data);
    // for each friend
    friends.map().once(async friend => {
      // determine shared secret
      const secret = await SEA.secret(friend.epub,identity);
      // encrypt location object
      const data = await SEA.encrypt(loc,secret);
      // save encrypted data to GUN
      location.get(friend.pub).put(data);
    });
  }

</script>

<div class="content">

  <div class="h-full" bind:this={container}>

    <div class="leaflet-top leaflet-right">
      <button class="leaflet-control button" on:click={locate}>
        {#if markers[identity.pub]}
          update my position
        {:else}
          set my position
        {/if}
      </button>
      <!-- {#if markers[identity.pub]}
        <button class="leaflet-control button" on:click={remove}>
          remove my position
        </button>
      {/if} -->
    </div>

  </div>
    
</div>

<style> @import 'leaflet/dist/leaflet.css'; </style>