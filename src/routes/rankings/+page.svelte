<script lang='ts'>
	import { server_loads } from '../../../.svelte-kit/generated/client/app.js';
	import ScoreBreakdown from '$lib/components/ScoreBreakdown.svelte';
	import { blankScore, type Score } from '$lib';
	import { getMatch } from '$lib/db.js';
	import { onMount } from 'svelte';

    let {data} = $props()
    let event = data.live_event;
    console.log(event.rankings)
</script>

<div class="w-full px-[15%] flex flex-col gap-4 items-center h-fit  overflow-visible relative bg-black">
	<h1 class="text-center text-2xl font-bold">Rankings</h1>
	{#each event.rankings as ranking, i}
		<div class="w-1/2 rounded-xl p-2 flex flex-row items-center justify-between bg-slate-500 h-fit">
			<h1 class="text-center text-2xl font-bold">{i+1}</h1>
			<h1 class="text-center text-2xl font-bold pl-[10%]">{ranking.team}</h1>
			<h1 class="text-center text-xl font-bold pl-[50%] pr-[10%]">Highest Score: {ranking.highest_score}</h1> 
		</div>
	{/each}
</div>