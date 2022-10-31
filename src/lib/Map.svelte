<script>

    import { onMount,onDestroy,setContext } from 'svelte';
    import { map,tileLayer } from 'leaflet';
    
    setContext('leaflet',{ getMap : () => MAP });

    // export let lat;
	// export let lng;
	// export let zoom;

    let container;
    let MAP;

    onMount(async () => {
        MAP = map(container,{ zoomControl:false, attributionControl:false });
        MAP.fitWorld();
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(MAP);
    });

    onDestroy(async () => { if (MAP) MAP.remove(); });

</script>

<main>
    <div bind:this={container}>
        {#if MAP}
            <slot/>
        {/if}
    </div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: 100vh;
    }
</style>