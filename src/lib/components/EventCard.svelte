<script lang="ts">
	import { goto } from "$app/navigation";
	import { getTeams, updateEvent } from "$lib/db";
	import Button from "./Button.svelte";

	let { 
		event = $bindable(), 
		type = "update", 
		closeEventPopup = async (e: any) => {}, 
		createEvent = async (e: any) => {} 
	} = $props();

	let addTeamPopup = $state(false);

	const updateStatus = (isLive: boolean) => {
		event = { ...event, live: isLive };
	};

	const toggleTeam = (teamNumber: number) => {
		let newTeams = [...event.team_numbers];
		if (newTeams.includes(teamNumber)) {
			newTeams = newTeams.filter(n => n !== teamNumber);
		} else {
			newTeams.push(teamNumber);
		}
		event = { ...event, team_numbers: newTeams };
	};

	const saveEvent = async () => {
		if (type === "update") {
			await updateEvent(event);
		} else {
			await createEvent(event);
		}
	};

	const getAllTeams = async () => {
		let data = await getTeams();
		return data || [];
	};
</script>

<div
	class="border border-slate-700 rounded-2xl
	p-4 sm:p-6
	h-fit w-full
	{event.live ? 'bg-slate-700' : 'bg-slate-800'}
	relative shadow-xl transition-colors duration-300"
>
	<div class="{addTeamPopup ? 'blur-xl opacity-50 pointer-events-none' : ''} transition-all duration-300">
		<div class="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
			
			<!-- Event Details -->
			<div class="w-full md:w-1/2 flex flex-col gap-4">
				<h2 class="text-xl font-bold text-green-400">Event Details</h2>

				<div class="flex flex-col gap-1">
					<label class="text-sm font-semibold text-slate-400">Season</label>
					<select
						class="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
						bind:value={event.season}
					>
						<option value="Test">Test Event</option>
						<option value="Unearthed 2025-2026">Unearthed 2025-2026</option>
					</select>
				</div>

				<div class="flex flex-col gap-1">
					<label class="text-sm font-semibold text-slate-400">Status</label>
					<div class="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
						<button
							class="flex-1 py-2 rounded-lg font-bold transition-all
							{event.live === false
								? 'bg-red-500 text-white shadow-lg'
								: 'text-slate-500 hover:text-red-400'}"
							onclick={() => updateStatus(false)}
						>
							DRAFT
						</button>
						<button
							class="flex-1 py-2 rounded-lg font-bold transition-all
							{event.live === true
								? 'bg-green-500 text-white shadow-lg'
								: 'text-slate-500 hover:text-green-400'}"
							onclick={() => updateStatus(true)}
						>
							LIVE
						</button>
					</div>
				</div>
			</div>

			<!-- Teams -->
			<div class="w-full md:w-1/2 flex flex-col">
				<h2 class="text-xl font-bold text-green-400 mb-4">
					Teams ({event.team_numbers.length})
				</h2>

				<div
					class="flex flex-wrap gap-2
					p-3 sm:p-4
					bg-slate-900/50 border border-slate-700
					rounded-2xl min-h-[120px] sm:min-h-[150px]
					content-start"
				>
					{#each event.team_numbers as team_number}
						<div
							class="flex items-center gap-1.5 sm:gap-2
							bg-slate-700 border border-slate-600
							rounded-lg px-2.5 sm:px-3 py-1
							hover:border-green-500 transition-colors"
						>
							<span class="text-lg font-bold text-white">{team_number}</span>
							<button
								class="text-slate-400 hover:text-red-500"
								onclick={() => toggleTeam(team_number)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="size-4">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{/each}
				</div>

				<div class="mt-4">
					<Button text="Add / Remove Teams" onClick={() => (addTeamPopup = true)} />
				</div>
			</div>
		</div>

		<div class="flex flex-col sm:flex-row justify-center gap-3 mt-6 sm:mt-8 border-t border-slate-700 pt-6">
			<Button text={type === "update" ? "Update Event" : "Create Event"} onClick={saveEvent} />
		</div>
	</div>

	<!-- Team Picker Modal -->
	{#if addTeamPopup}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
			<div
				class="bg-slate-900 border border-green-500/50 rounded-2xl
				p-4 sm:p-6
				w-full h-full sm:h-auto sm:max-w-5xl
				flex flex-col shadow-2xl
				animate-in fade-in zoom-in duration-200"
			>
				<div class="flex justify-between items-center mb-4 sm:mb-6">
					<h1 class="text-2xl font-bold text-green-400">Manage Team List</h1>
					<button
						onclick={() => (addTeamPopup = false)}
						class="text-slate-400 hover:text-red-500 hover:scale-110 transition-transform"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="size-8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="flex-1 overflow-y-auto">
					{#await getAllTeams()}
						<div class="h-full flex items-center justify-center text-slate-500">Loading DB...</div>
					{:then teams}
						<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
							{#each teams.sort((a, b) => a.number! - b.number!) as team}
								<button
									class="p-4 rounded-xl border-2 font-bold text-xl transition-all
									{event.team_numbers.includes(team.number)
										? 'bg-green-600 border-green-400 text-white scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
										: 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}"
									onclick={() => toggleTeam(team.number || -1)}
								>
									{team.number}
								</button>
							{/each}
						</div>
					{/await}
				</div>

				<div class="mt-6 flex justify-center">
					<Button text="Close Picker" onClick={() => (addTeamPopup = false)} />
				</div>
			</div>
		</div>
	{/if}

	<div class="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <div class="flex items-center gap-1 rounded-xl bg-slate-900/80 backdrop-blur border border-slate-700 shadow-lg">
            
            {#if type === "update"}
                <button
                    onclick={() => goto(`/edit/events/${event.id}`)}
                    class="group p-2.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all"
                    aria-label="Open event page"
                >
                    <!-- External / Open Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 3h6v6M10 14L21 3M21 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    </svg>
                </button>
            {/if}
    
            <div class="w-px h-6 bg-slate-700"></div>
    
            <button
                onclick={() => closeEventPopup()}
                class="group p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
                aria-label="Close event"
            >
                <!-- X Mark Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
    
        </div>
    </div>
    
</div>
