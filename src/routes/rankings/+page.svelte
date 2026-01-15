<script lang="ts">
	import { getTeamByNumber, supabase } from '$lib/db.js';
	
	let { data } = $props();
	let event = data.live_event;
	let rankings = $state(event.rankings);
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		const channel = supabase
			.channel('rankings-live')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'rankings'
				},
				async () => {
					// Refetch updated rankings
					const { data, error } = await supabase
						.from('rankings')
						.select('*')
						// .order('highest_score', { ascending: false });

					if (!error && data) {
						rankings = (data.find((ranking: any) => ranking.event_id == event.id))?.rankings;
						console.log(rankings)
					}
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

</script>

<div class="w-full px-4 sm:px-8 lg:px-[15%] flex flex-col gap-6 items-center bg-black">
	<h1 class="text-center text-3xl font-bold text-green-300">
	Rankings
	</h1>
	<!-- <header class="text-center text-3xl font-bold text-red-500">ALL ORIGINAL MATCH TIMES DELAYED BY ~35 MINUTES</header> -->

		
	<div
	class="
		w-full
		gap-4
		columns-1            /* Default: 1 column on mobile */
		sm:columns-2         /* Tablet: 2 columns */
		lg:columns-3         /* Desktop: 3 columns */
		max-w-6xl
	"
	>
	{#each rankings as ranking, i}
		{#await getTeamByNumber(ranking.team)}
				<div class="w-full h-20 bg-slate-800 rounded-2xl animate-pulse mb-4 break-inside-avoid-column"></div>
		{:then team}
		<div
		class="
			group
			w-full
			rounded-2xl
			p-4
			flex
			items-center
			gap-4
			border
			border-green-500/30
			bg-black
			transition
			hover:border-green-400
			hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]
								
								/* Added margin-bottom for vertical spacing in column flow */
								mb-4 
								
								/* Crucial: Prevents the card from being cut in half across columns */
								break-inside-avoid-column 
								
			{team![0].number === data.teamNum
			? 'border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.25)]'
			: ''}
		"
		>
				<div
			class="
			flex
			items-center
			justify-center
			w-10
			h-10
			rounded-full
			font-bold
			text-black
			{ i === 0
				? 'bg-yellow-400'
				: i === 1
				? 'bg-gray-300'
				: i === 2
				? 'bg-orange-400'
				: 'bg-green-400' }
			"
		>
			{i + 1}
		</div>
		
			<div class="flex flex-col flex-1 min-w-0">
			<div class="text-lg font-bold text-green-300 truncate">
			Team {team![0].number}
			</div>
			<div class="text-sm text-green-400/70 truncate">
			{team![0].name}
			</div>
		</div>
		
				<div class="text-right">
			<div class="text-xs uppercase text-green-400/60">
			High Score
			</div>
			<div class="text-xl font-bold text-green-300">
			{ranking.highest_score}
			</div>
		</div>
		</div>
		{/await}
	{/each}
	</div>
</div>