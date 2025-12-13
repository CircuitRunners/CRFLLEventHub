<script lang='ts'>
    let {data} = $props()
    let event = data.live_event;
</script>

<div class="w-full px-[15%] flex flex-col gap-4 items-center h-fit  overflow-visible relative bg-black">
	<h1 class="text-center text-2xl font-bold">Rankings</h1>
	<div class="w-[100%] h-full gap-4 grid grid-rows-8 grid-cols-3 grid-flow-col ">
		{#each event.rankings as ranking, i}
			<div class="w-full rounded-xl p-2 flex flex-row items-center justify-between bg-slate-500 h-fit {ranking.team === data.teamNum ? "bg-slate-700" : ""}">
				<h1 class="text-center text-2xl font-bold pr-2">{i+1}</h1>
				<h1 class="text-center text-2xl font-bold pl-[10%]">{ranking.team}</h1>
				<h1 class="text-center text-xl font-bold pl-[30%] text-wrap pr-[10%]">Highest Score: <span>{ranking.highest_score}</span></h1> 
			</div>
		{/each}
	</div>
</div>