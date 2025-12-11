<script lang='ts'>
	import { addMatchToEvent, getMatch, updateMatch } from '$lib/db.ts';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import { createMatch, updateEvent } from '$lib/db.js';
	import { onMount } from 'svelte';

    let {data} = $props()
    let event: any = data.event![0]
    console.log(event)
    let matches: any[] = $state([]);
    onMount(async () => {
        for (let id of event.schedule.matches || []) {
            let match = await getMatch(id);
            if (match !== null) {
                matches = [...matches, match[0]];
            }
        }
        console.log(matches)
    })
    let addMatchPopup = $state(false);
    let blankMatch = {
        table1: {
            team: -1,
            score: -1,
        },
        table2: {
            team: -1,
            score: -1,
        },
        table3: {
            team: -1,
            score: -1,
        },
        table4: {
            team: -1,
            score: -1,
        },
        table5: {
            team: -1,
            score: -1,
        },
        table6: {
            team: -1,
            score: -1,
        },
        time: "",
        event_id: event.id,
    }
    let newMatch = $state(blankMatch);
    // console.log(newMatch)
    const createNewMatch = async () => {
        addMatchPopup = false;
        console.log(newMatch)
        let data = await addMatchToEvent(newMatch);
        console.log(data)
        matches = [...matches, data];
        newMatch = blankMatch;
    }
    const saveMatch = async (match: any) => {
        console.log(match)
        matches.map((old_match: any) => {
            if (old_match.id === match.id) {
                return match;
            } else {
                return old_match;
            }
        })
        let data = await updateMatch(match);
        console.log(data)
    }
</script>

<div class="w-3/4 ml-[12.5%] h-[90%] flex flex-col items-center relative ">
    <Button text="Live Scoring" classContent="my-[2%] scale-[150%]" onClick={() => {goto(`/edit/events/${event.id}/scoring`)}}></Button> 
    <div class="{addMatchPopup ? "blur-2xl" : ""}">
        <h1 class="text-center text-2xl font-bold">Event {event.season} | {event.type}</h1>
        
        <EventCard event={event} closeEventPopup={async() => {}} createEvent={async() => {}} type="update" />
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="w-full h-fit flex flex-col items-center {addMatchPopup ? "blur-2xl" : ""} justify-center">
        <h1 class="text-center text-2xl font-bold mb-[2%]">{event.schedule ? "Update" : "Create" } Schedule</h1> 
        {#each matches as match, index}
        <div class="w-3/4 h-full top-[5%] left-1/8 bg-slate-800 flex flex-col items-center border rounded-lg mb-4">
            <h1 class="text-2xl text-center font-bold pb-4">Match {index+ 1}</h1>
            <div class="flex flex-row w-3/4 justify-start mb-2 gap-1">
                <label for="time" class="text-center text-md">Select a Time</label>
                <input type="time" class="bg-slate-600 border rounded-lg p-2 w-full" bind:value={match.time}>
            </div>
            <div class="flex flex-row w-full h-full">

                <div class="flex flex-col gap-4 overflow-scroll w-3/4">
                    <div class="border rounded-lg w-[90%] ml-[5%] h-fit px-2 bg-slate-600 relative">
                        <h1 class="text-center text-lg font-bold">Table 1</h1>
                        <div class="flex flex-col items-start mb-2 gap-1">
                            <label for="team" class="text-center text-md">Select a Team</label>
                            <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={match.table1.team}>
                                <option value="-1" selected>Select a Team</option>
                                {#each event.team_numbers as team}
                                    <option value={team}>{team}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div class="border rounded-lg w-[90%] ml-[5%] h-fit px-2 bg-slate-600 relative">
                        <h1 class="text-center text-lg font-bold">Table 2</h1>
                        <div class="flex flex-col items-start mb-2 gap-1">
                            <label for="team" class="text-center text-md">Select a Team</label>
                            <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={match.table2.team}>
                                <option value="-1" selected>Select a Team</option>
                                {#each event.team_numbers as team}
                                <option value={team}>{team}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div class="border rounded-lg w-[90%] ml-[5%] h-fit px-2 bg-slate-600 relative">
                        <h1 class="text-center text-lg font-bold">Table 3</h1>
                        <div class="flex flex-col items-start mb-2 gap-1">
                            <label for="team" class="text-center text-md">Select a Team</label>
                            <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={match.table3.team}>
                                <option value="-1" selected>Select a Team</option>
                                {#each event.team_numbers as team}
                                <option value={team}>{team}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 overflow-scroll w-3/4">
                    <div class="border rounded-lg w-[90%] ml-[5%] h-fit px-2 bg-slate-600 relative">
                        <h1 class="text-center text-lg font-bold">Table 4</h1>
                        <div class="flex flex-col items-start mb-2 gap-1">
                            <label for="team" class="text-center text-md">Select a Team</label>
                            <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={match.table4.team}>
                                <option value="-1" selected>Select a Team</option>
                                {#each event.team_numbers as team}
                                    <option value={team}>{team}</option>
                                    {/each}
                            </select>
                        </div>
                    </div>
                    <div class="border rounded-lg w-[90%] ml-[5%] h-fit px-2 bg-slate-600 relative">
                        <h1 class="text-center text-lg font-bold">Table 5</h1>
                        <div class="flex flex-col items-start mb-2 gap-1">
                            <label for="team" class="text-center text-md">Select a Team</label>
                            <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={match.table5.team}>
                                <option value="-1" selected>Select a Team</option>
                                {#each event.team_numbers as team}
                                <option value={team}>{team}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div class="border rounded-lg w-[90%] ml-[5%] h-fit px-2 bg-slate-600 relative">
                        <h1 class="text-center text-lg font-bold">Table 6</h1>
                        <div class="flex flex-col items-start mb-2 gap-1">
                            <label for="team" class="text-center text-md">Select a Team</label>
                            <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={match.table6.team}>
                                <option value="-1" selected>Select a Team</option>
                                {#each event.team_numbers as team}
                                    <option value={team}>{team}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Button text="Update Match" onClick={() => saveMatch(match)}></Button>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="absolute top-0 right-0 bg-transparent hover:text-red-600 stroke-green-200 p-1 cursor-pointer" onclick={() => {addMatchPopup = false}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>              
            </button>
        </div>
        {/each}
        <Button text="Add Match" onClick={() => {addMatchPopup = true}}></Button>
    </div>
    <div class="fixed w-1/2 h-[90%] top-[5%] left-1/4 bg-slate-800 flex flex-col items-center {addMatchPopup ? "block" : "hidden"} border rounded-lg z-10">
        <h1 class="text-2xl text-center font-bold pb-4">New Match</h1>
        <div class="flex flex-row w-3/4 justify-start mb-2 gap-1">
            <label for="time" class="text-center text-md">Select a Time</label>
            <input type="time" class="bg-slate-600 border rounded-lg p-2 w-full" bind:value={newMatch.time}>
        </div>
        <div class="flex flex-col gap-4 overflow-scroll w-3/4">
            <div class="border rounded-lg w-full h-1/6 px-2 bg-slate-600 relative">
                <h1 class="text-center text-lg font-bold">Table 1</h1>
                <div class="flex flex-col items-start mb-2 gap-1">
                    <label for="team" class="text-center text-md">Select a Team</label>
                    <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={newMatch.table1.team}>
                        <option value="-1" selected>Select a Team</option>
                        {#each event.team_numbers as team}
                            <option value={team}>{team}</option>
                        {/each}
                    </select>
                </div>
                <div class="absolute right-0 w-[48%] z-10 top-[25%] flex-col flex gap-2 items-center rounded-lg h-[75%] border ">
                    <h1 class="text-center text-lg font-bold">Score</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-center border rounded-lg text-green-200 p-1 bg-slate-700 hover:bg-slate-500 cursor-pointer hover:text-amber-600" onclick={() => goto(`/edit/events/${event.id}/-1/table1`)}>
                        Go to score
                    </button>
                </div>
            </div>
            <div class="border rounded-lg w-full h-1/6 px-2 bg-slate-600 relative">
                <h1 class="text-center text-lg font-bold">Table 2</h1>
                <div class="flex flex-col items-start mb-2 gap-1">
                    <label for="team" class="text-center text-md">Select a Team</label>
                    <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={newMatch.table2.team}>
                        <option value="-1" selected>Select a Team</option>
                        {#each event.team_numbers as team}
                        <option value={team}>{team}</option>
                        {/each}
                    </select>
                </div>
                <div class="absolute right-0 w-[48%] z-10 top-[25%] flex-col flex gap-2 items-center rounded-lg h-[75%] border ">
                    <h1 class="text-center text-lg font-bold">Score</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-center border rounded-lg text-green-200 p-1 bg-slate-700 hover:bg-slate-500 cursor-pointer hover:text-amber-600" onclick={() => goto(`/edit/events/${event.id}/-1/table2`)}>
                        Go to score
                    </button>
                </div>
            </div>
            <div class="border rounded-lg w-full h-1/6 px-2 bg-slate-600 relative">
                <h1 class="text-center text-lg font-bold">Table 3</h1>
                <div class="flex flex-col items-start mb-2 gap-1">
                    <label for="team" class="text-center text-md">Select a Team</label>
                    <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={newMatch.table3.team}>
                        <option value="-1" selected>Select a Team</option>
                        {#each event.team_numbers as team}
                            <option value={team}>{team}</option>
                        {/each}
                    </select>
                </div>
                <div class="absolute right-0 w-[48%] z-10 top-[25%] flex-col flex gap-2 items-center rounded-lg h-[75%] border ">
                    <h1 class="text-center text-lg font-bold">Score</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-center border rounded-lg text-green-200 p-1 bg-slate-700 hover:bg-slate-500 cursor-pointer hover:text-amber-600" onclick={() => goto(`/edit/events/${event.id}/-1/table3`)}>
                        Go to score
                    </button>
                </div>
            </div>
            <div class="border rounded-lg w-full h-1/6 px-2 bg-slate-600 relative">
                <h1 class="text-center text-lg font-bold">Table 4</h1>
                <div class="flex flex-col items-start mb-2 gap-1">
                    <label for="team" class="text-center text-md">Select a Team</label>
                    <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={newMatch.table4.team}>
                        <option value="-1" selected>Select a Team</option>
                        {#each event.team_numbers as team}
                            <option value={team}>{team}</option>
                            {/each}
                    </select>
                </div>
                <div class="absolute right-0 w-[48%] z-10 top-[25%] flex-col flex gap-2 items-center rounded-lg h-[75%] border ">
                    <h1 class="text-center text-lg font-bold">Score</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-center border rounded-lg text-green-200 p-1 bg-slate-700 hover:bg-slate-500 cursor-pointer hover:text-amber-600" onclick={() => goto(`/edit/events/${event.id}/-1/table4`)}>
                        Go to score
                    </button>
                </div>
            </div>
            <div class="border rounded-lg w-full h-1/6 px-2 bg-slate-600 relative">
                <h1 class="text-center text-lg font-bold">Table 5</h1>
                <div class="flex flex-col items-start mb-2 gap-1">
                    <label for="team" class="text-center text-md">Select a Team</label>
                    <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={newMatch.table5.team}>
                        <option value="-1" selected>Select a Team</option>
                        {#each event.team_numbers as team}
                        <option value={team}>{team}</option>
                        {/each}
                    </select>
                </div>
                <div class="absolute right-0 w-[48%] z-10 top-[25%] flex-col flex gap-2 items-center rounded-lg h-[75%] border ">
                    <h1 class="text-center text-lg font-bold">Score</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-center border rounded-lg text-green-200 p-1 bg-slate-700 hover:bg-slate-500 cursor-pointer hover:text-amber-600" onclick={() => goto(`/edit/events/${event.id}/-1/table5`)}>
                        Go to score
                    </button>
                </div>
            </div>
            <div class="border rounded-lg w-full h-1/6 px-2 bg-slate-600 relative">
                <h1 class="text-center text-lg font-bold">Table 6</h1>
                <div class="flex flex-col items-start mb-2 gap-1">
                    <label for="team" class="text-center text-md">Select a Team</label>
                    <select name="team" class="bg-slate-600  border rounded-lg p-2 w-1/2" bind:value={newMatch.table6.team}>
                        <option value="-1" selected>Select a Team</option>
                        {#each event.team_numbers as team}
                            <option value={team}>{team}</option>
                        {/each}
                    </select>
                </div>
                <div class="absolute right-0 w-[48%] z-10 top-[25%] flex-col flex gap-2 items-center rounded-lg h-[75%] border ">
                    <h1 class="text-center text-lg font-bold">Score</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-center border rounded-lg text-green-200 p-1 bg-slate-700 hover:bg-slate-500 cursor-pointer hover:text-amber-600" onclick={() => goto(`/edit/events/${event.id}/-1/table6`)}>
                        Go to score
                    </button>
                </div>
            </div>
        </div>
        <Button text="Add Match" onClick={createNewMatch}></Button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="absolute top-0 right-0 bg-transparent hover:text-red-600 stroke-green-200 p-1 cursor-pointer" onclick={() => {addMatchPopup = false}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>              
        </button>
    </div>
</div>