<script>

	import { onDestroy } from 'svelte';
	import { getContext } from 'svelte';
	import { circle } from 'leaflet';

	const { getMap } = getContext('leaflet');
	const map = getMap();

	export let lat;
	export let lng;
	export let accuracy;
	export let color;
	export let alias;

	let c = circle([lat,lng],accuracy,{color:color})
		.bindPopup(String(alias))
		.addTo(map);

	onDestroy( () => { if (map.hasLayer(c)) map.removeLayer(c); });
	
</script>