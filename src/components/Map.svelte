<script>

  import { user } from '../initGUN';
  import { onMount } from 'svelte';
  import { map,tileLayer,circle,featureGroup } from 'leaflet';

  // --- map stuff --- >
  let container,MAP;
  onMount(() => {
    MAP = map(container,{
      zoomControl : false,
      attributionControl : false,
      worldCopyJump : true,
    });
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(MAP);
    MAP.on('locationfound',location_found);
    MAP.fitWorld();
  });

  // --- gerneral location stuff --- >
  const identity = user._.sea; // cryptographic identity of user
  let alias; user.get('alias').on(a => alias = a); // alias of user
  const location = user.get('location'); // reference to location
  const friends = user.get('friends'); // reference to friends
  const locate = () => MAP.locate();
  // const remove = () => location.put(null);

  // --- marker stuff --- >
  let markers = {};
  async function set (pub,loc,secret,color,alias) {
    loc = JSON.parse(loc);
    if (loc && loc[identity.pub]) {
      const data = await SEA.decrypt(loc[identity.pub],secret);
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
      delete markers[pub];
      markers = markers;
    }
    // set view to fit all markers
    const array = Object.values(markers);
    if (array.length) {
      const group = featureGroup(array);
      MAP.fitBounds(group.getBounds().pad(0.5));
    }
  }

  // --- subscribe to location of user --- >
  location.on(loc => set(identity.pub,loc,identity,'green',alias));

  // --- subscribe to locations of friends --- >
  friends.map().on(async friend => {
    if (friend) {
      const secret = await SEA.secret(friend.epub,identity);
      set(friend.pub,friend.location,secret,'red',friend.alias);
    }
  });

  // --- set location --- >
  async function location_found (e) {
    // create position object
    const position = {
      latitude : e.latitude,
      longitude : e.longitude,
      accuracy : e.accuracy,
    };
    // encrypt for user
    const data = await SEA.encrypt(position,identity);
    // create temporary object
    const tmp = { [identity.pub] : data };
    // stringify and save to GUN
    location.put(JSON.stringify(tmp));
    // for each friend
    friends.map().once(async friend => {
      if (friend) {
        // determine shared secret
        const secret = await SEA.secret(friend.epub,identity);
        // encrypt for friend
        const data = await SEA.encrypt(position,secret);
        // add to temporary object
        tmp[friend.pub] = data;
        // stringify and save to GUN
        location.put(JSON.stringify(tmp));
      }
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