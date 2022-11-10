<script>

	import { getContext } from 'svelte';
	import { circle } from 'leaflet';

	const { getMap } = getContext('leaflet');
	const map = getMap();

	export let lat;
	export let lng;
	export let alias;

	circle([lat,lng],{color:'red'})
		.bindPopup(String(alias))
		.addTo(map);

</script>