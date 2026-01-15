<script lang='ts'>
    import AsyncButton from '$lib/components/AsyncButton.svelte';
    import { addMatchToEvent, createRankings, getMatch, getRankingsByEvent, getTeamByNumber, updateMatch, updateRankings } from '$lib/db.ts';
    import { goto } from '$app/navigation';
    import EventCard from '$lib/components/EventCard.svelte';
    import Button from '$lib/components/Button.svelte';
    import { createMatch, updateEvent } from '$lib/db.js';
    import { onMount } from 'svelte';

    let {data} = $props()
    let event: any = $state(data.event![0])
    let matches: any[] = $state([]);

    onMount(async () => {
        const scheduleIds = event.schedule?.matches || [];
        for (let id of scheduleIds) {
            let match = await getMatch(id);
            if (match) matches = [...matches, match[0]];
        }
    })

    let addMatchPopup = $state(false);
    
    const getBlankMatch = () => ({
        table1: { team: -1, score: -1 },
        table2: { team: -1, score: -1 },
        table3: { team: -1, score: -1 },
        table4: { team: -1, score: -1 },
        table5: { team: -1, score: -1 },
        table6: { team: -1, score: -1 },
        time: "",
        event_id: event.id,
    });

    let newMatch = $state(getBlankMatch());

    const createNewMatch = async () => {
        addMatchPopup = false;
        let result = await addMatchToEvent(newMatch);
        matches = [...matches, result];
        newMatch = getBlankMatch();
    }

    const saveMatch = async (match: any) => {
        await updateMatch(match);
        // Toast or feedback could go here
    }

    const getHighestScore = (team: any) => {
        let highest_score = 0;
        for (let something of team.highest_score_by_event || []) {
            if(something.event_id == matches[0].event_id) {
                highest_score = something.score;
            }
        }
        console.log(team.number)
        console.log(highest_score)
        return highest_score || 0;
    }

    const fixRankings = async () => {
        let rankings = [];
        for (let teamNum of event.team_numbers) {
            let team_data = (await getTeamByNumber(teamNum))![0];
            rankings.push({team: teamNum, highest_score: (getHighestScore(team_data))});
        }
        rankings.sort((a, b) => b.highest_score - a.highest_score);
        console.log(rankings)
        event = { ...event, rankings }; 
        await updateEvent(event);

        let data = await getRankingsByEvent(event.id);
        console.log(data)
        // console.log({event_id: event.id, rankings: rankings})
        if (data?.length == 1) {
            console.log("updating")
            data = await updateRankings({event_id: event.id, rankings: rankings});
        } else {
            console.log("creating")
            data = await createRankings({event_id: event.id, rankings: rankings});
        }
    }
</script>

<div class="w-full max-w-5xl mx-auto min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 pb-24">
    
    <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-6 rounded-3xl border border-slate-700 shadow-2xl {addMatchPopup ? 'blur-md' : ''}">
        <div class="text-center md:text-left">
            <h1 class="text-3xl font-black text-white uppercase tracking-tighter">Event Control</h1>
            <p class="text-green-400 font-mono text-sm">{event.season} • {event.type}</p>
        </div>
        <div class="flex gap-3">
            <button onclick={fixRankings} class="px-6 cursor-pointer py-3 rounded-xl bg-slate-800 border border-slate-600 text-green-400 font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                Update Rankings
            </button>
            <Button text="Launch Live Scoring" onClick={() => goto(`/edit/events/${event.id}/scoring`)} />
        </div>
    </div>

    <div class="w-full transition-all duration-300 {addMatchPopup ? 'blur-md' : ''}">
        <EventCard bind:event={event} closeEventPopup={async() => {}} createEvent={async() => {}} type="update" />
    </div>

    <div class="w-full flex flex-col items-center gap-6 transition-all duration-300 {addMatchPopup ? 'blur-md' : ''}">
        <div class="w-full flex justify-between items-end border-b border-slate-700 pb-4">
            <h2 class="text-2xl font-bold text-white uppercase tracking-tight">
                {event.schedule ? "Match Schedule" : "Create Schedule"}
            </h2>
            <button onclick={() => addMatchPopup = true} class="bg-green-600 cursor-pointer hover:bg-green-500 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                Add Match
            </button>
        </div>

        {#each matches as match, index}
            <div class="w-full bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
                <div class="bg-slate-900 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <span class="bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase">Match {index + 1}</span>
                        <div class="flex items-center gap-2 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <input type="time" class="bg-transparent border-none text-white font-bold focus:ring-0 cursor-pointer p-0" bind:value={match.time}>
                        </div>
                    </div>
                    <button onclick={() => saveMatch(match)} class="text-green-400 cursor-pointer hover:text-green-300 font-bold text-sm uppercase tracking-widest transition-colors">Save Changes</button>
                </div>

                <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each [1, 2, 3, 4, 5, 6] as tableNum}
                        {@const tableName = `table${tableNum}`}
                        <div class="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between hover:border-slate-600 transition-all">
                            <span class="text-slate-500 font-bold text-sm uppercase">Table {tableNum}</span>
                            <select 
                                class="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white font-bold min-w-[160px] focus:border-green-500 outline-none transition-all"
                                bind:value={match[tableName].team}
                            >
                                <option value="-1">Empty</option>
                                {#each event.team_numbers as team}
                                    <option value={team}>Team {team}</option>
                                {/each}
                            </select>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    {#if addMatchPopup}
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="absolute inset-0 bg-black/80 backdrop-blur-x cursor-pointer" onclick={() => addMatchPopup = false}></div>
            
            <div class="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col animate-in zoom-in duration-200">
                <div class="p-8">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-3xl font-black text-white uppercase italic tracking-tighter">New Match</h2>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button onclick={() => addMatchPopup = false} class="p-2 text-slate-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="space-y-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Scheduled Time</label>
                            <input type="time" class="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white text-xl font-bold focus:border-green-500 outline-none transition-all w-full" bind:value={newMatch.time}>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            {#each [1, 2, 3, 4, 5, 6] as tableNum}
                                {@const tableName = `table${tableNum}`}
                                <div class="flex flex-col gap-2">
                                    <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Table {tableNum}</label>
                                    <select 
                                        class="bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-bold focus:border-green-500 outline-none w-full"
                                        bind:value={newMatch![tableName!].team}
                                    >
                                        <option value="-1">Select Team</option>
                                        {#each event.team_numbers as team}
                                            <option value={team}>{team}</option>
                                        {/each}
                                    </select>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="p-8 bg-slate-950/50 rounded-b-[2rem] flex justify-center border-t border-slate-800">
                    <Button text="Create Match Instance" onClick={createNewMatch} />
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Custom scrollbar for a cleaner dark look */
    :global(body) {
        background-color: #0f172a;
    }
</style>