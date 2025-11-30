<script lang="ts">
	import { goto } from '$app/navigation';
	import AnimatedInputLabel from '$lib/components/AnimatedInputLabel.svelte';
	import { getMatch } from '$lib/db';
	import { onMount } from 'svelte';

    let {data} = $props()
    let match: any = data.match![0]
    let event: any = data.event![0]
    let tables: any[] = $state([match.table1, match.table2, match.table3, match.table4, match.table5, match.table6]);
</script>

<div class="w-3/4 ml-[12.5%] h-[90%] flex flex-col items-center relative ">
    <h1 class="text-center text-2xl font-bold mb-2">Select a Match</h1>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    {#each tables as table, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="group w-1/2 top-[5%] left-1/8 bg-slate-800 p-2  flex flex-row justify-between hover:bg-slate-500 hover:text-amber-500 cursor-pointer items-center border rounded-lg mb-4"
        onclick={() => {goto(`/edit/events/${event.id}/scoring/${match.id}/table${index+1}`)}}>
            <h1 class="text-2xl text-center font-bold">Table {index+ 1}</h1>
            <AnimatedInputLabel size="cursor-pointer" name="Team" value={table.team} disabled={true} labelbg=" group-hover:bg-slate-500 bg-slate-800" mt="mt-2"/>
        </div>
    {/each}
</div>