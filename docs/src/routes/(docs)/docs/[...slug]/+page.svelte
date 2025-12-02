<script lang="ts">
	import { DocPage } from "@svecodocs/kit";
    import {getNavigationNeighbors} from "$lib/navigation";
    import {page} from "$app/state";
	let { data } = $props();
    let neighbors = $derived.by(() => getNavigationNeighbors(page.url.pathname));

</script>

<DocPage component={data.component} {...data.metadata} {neighbors}/>
