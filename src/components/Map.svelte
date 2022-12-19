<script>

    import { user } from '../initGUN';

    import Marker from '../lib/Marker.svelte';

    import { onMount,onDestroy,setContext } from 'svelte';

    import { map,tileLayer } from 'leaflet';
    
    setContext('leaflet',{ getMap : () => MAP });

    const ref = user.get('friends');
	const friends = ref.map();
    const alias = user.get('alias');

    let loc = user.get('loc');
    let location;
    $: if ($loc) {
        console.log($loc)
        location = JSON.parse($loc);
        console.log(location)
    }

    let lat = user.get('lat');
    let lng = user.get('lng');
    let accuracy = user.get('accuracy');

    let container;
    let MAP;

    onMount(async () => {
        MAP = map(container, {
            zoomControl : false,
            attributionControl : false,
            worldCopyJump : true,
            // maxBoundsViscosity : 1,
            //maxBounds : bounds,
        });
        MAP.fitWorld();
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(MAP);

        MAP.on('locationfound',locationfound);
    });

    onDestroy(async () => { if (MAP) MAP.remove(); });


    function locate () {
        MAP.locate({setView: true, maxZoom: 16});
    }

    function locationfound (e) {
        // put to GUN
        lat.put(e.latlng.lat);
        lng.put(e.latlng.lng);
        accuracy.put(e.accuracy);
        // put as loc
        let loc = {
            lat : e.latlng.lat,
            lng : e.latlng.lng,
            accuracy : e.accuracy,
        }
        let str = JSON.stringify(loc);
        user.get('loc').put(str);
    }

    //console.log($friends)

    // for (let [key,friend] of $friends) {
    //     console.log(friend)
    // }

</script>

<div class="content">

    <div class="sm:h-screen h-full" bind:this={container}>

        {#if MAP}

            {#if location}
                <Marker
                    bind:lat={location.lat}
                    bind:lng={location.lng}
                    bind:accuracy={location.accuracy}
                    alias={$alias}
                    color=green
                />
            {/if}
        

            {#each $friends as [key,friend]}

                {#if (friend.lat && friend.lng && friend.accuracy)}
                    <Marker
                        bind:lat={friend.lat}
                        bind:lng={friend.lng}
                        bind:accuracy={friend.accuracy}
                        bind:alias={friend.alias}
                        color=red
                    />
                {/if}

            {/each}

            <div class="leaflet-top leaflet-right">
                <button class="leaflet-control button" on:click={locate}>
                    update my position
                </button>
            </div>

        {/if}

    </div>
    
</div>

<style>
    @import 'leaflet/dist/leaflet.css';
</style>