<script>

	import { getContext } from 'svelte';
	import { marker } from 'leaflet';

	const { getMap } = getContext('leaflet');
	const map = getMap();

	export let lat;
	export let lng;
	export let alias;

	marker([lat,lng]).bindPopup(alias).addTo(map);

</script>