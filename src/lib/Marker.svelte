<script>

    import { getContext } from 'svelte';
	import { marker } from 'leaflet';

	const { getMap } = getContext('leaflet');
	const map = getMap();

	export let lat;
	export let lng;

	marker([lat,lng]).addTo(map);

</script>