<script lang="ts">
	import { goto } from '$app/navigation';
	import { getMatch } from '$lib/db';
	import { onMount } from 'svelte';

    let {data} = $props()
    let event: any = data.event![0]
    let matches: any[] = $state([]);
    onMount(async () => {
        for (let id of event.schedule.matches) {
            let match = await getMatch(id);
            if (match !== null) {
                matches = [...matches, match[0]];
            }
        }
        console.log(matches)
    })
</script>
<div class="w-3/4 ml-[12.5%] h-[90%] flex flex-col items-center relative ">
    <h1 class="text-center text-2xl font-bold mb-2">Select a Match</h1>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    {#each matches as match, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="w-1/2 top-[5%] left-1/8 bg-slate-800 p-2 flex flex-row justify-between hover:bg-slate-500 hover:text-amber-500 cursor-pointer items-center border rounded-lg mb-4"
        onclick={() => {goto(`/edit/events/${event.id}/scoring/${match.id}`)}}>
            <h1 class="text-2xl text-center font-bold">Match {index+ 1}</h1>
            <div>
                <label for="time" class="text-center text-lg">Match Time</label>
                <input type="time" class="bg-slate-600 border rounded-lg p-2" value={match.time} disabled>
            </div>
        </div>
    {/each}
</div>