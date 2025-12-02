<script lang="ts">
	import { DocPage } from "@svecodocs/kit";
    import {getNavigationNeighbors} from "$lib/navigation";
    import {page} from "$app/state";
    import type {ComponentProps} from "svelte";
	let { data } = $props();

    const contributors: ComponentProps<typeof DocPage>['contributors'] = [
        {
            login: 'theetherGit',
            avatar_url: 'https://avatars.githubusercontent.com/u/71087863',
            contributions: 4
        },
        {
            login: 'etherCorps',
            avatar_url: 'https://avatars.githubusercontent.com/u/71087863',
            contributions: 4
        }
    ];

    let neighbors = $derived.by(() => getNavigationNeighbors(page.url.pathname));
</script>

<DocPage component={data.component} {...data.metadata} {neighbors} />
