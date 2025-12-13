<script lang="ts">
	import { getTeamByNumber } from '$lib/db.js';

	let { data } = $props();
	let event = data.live_event;
</script>

<div class="w-full px-4 sm:px-8 lg:px-[15%] flex flex-col gap-6 items-center bg-black">
	<h1 class="text-center text-3xl font-bold text-green-300">
		Rankings
	</h1>

	<!-- Rankings grid -->
	<div
		class="
			w-full
			grid
			gap-4
			grid-cols-1
			sm:grid-cols-2
			lg:grid-cols-3
		"
	>
		{#each event.rankings as ranking, i}
			{#await getTeamByNumber(ranking.team)}
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
						{team![0].number === data.teamNum
							? 'border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.25)]'
							: ''}
					"
				>
					<!-- Rank badge -->
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

					<!-- Team info -->
					<div class="flex flex-col flex-1 min-w-0">
						<div class="text-lg font-bold text-green-300 truncate">
							Team {team![0].number}
						</div>
						<div class="text-sm text-green-400/70 truncate">
							{team![0].name}
						</div>
					</div>

					<!-- Score -->
					<div class="text-right">
						<div class="text-xs uppercase text-green-400/60">
							High Score
						</div>
						<div class="text-xl font-bold text-green-300">
							{team![0].highest_score}
						</div>
					</div>
				</div>
			{/await}
		{/each}
	</div>
</div>
