<script lang='ts'>
	import { createEvent, getTeams, updateEvent } from "$lib/db";
	import AnimatedInputLabel from "./AnimatedInputLabel.svelte";
	import Button from "./Button.svelte";

    export let event;
    export let type = "update";
    let addTeamPopup = false;
    let addTeamNumber: number;
    const addTeam = async () => {
        event.team_numbers.push(addTeamNumber);
        addTeamPopup = false;
        addTeamNumber = 0;
        console.log(event)
    }
    const saveEvent = async () => {
        if( type === "update") {
            let data = await updateEvent(event);
            console.log(data)
        }
        else if (type === "create") {
            let data = await createEvent(event);
            console.log(data)
        }
    }
    const getAllTeams = async () => {
        let data = await getTeams();
        if (data) {
            let teams = data.map((team: any) => {
                return {
                    name: team.name,
                    number: team.number,
                    selected: event.team_numbers.indexOf(team.number) != -1
                }
            })
            console.log(teams)
            return teams;
        }
        else {
            return [];
        }
    }
</script>

<div class="border rounded-lg p-4 h-fit w-full bg-slate-800 relative">
    <div class="flex justify-between gap-2 {addTeamPopup? "blur-2xl" : "blur-0"}">
        <div class="w-1/2 h-full">
            <label for="season" class="text-center text-md">Select a Season</label>
            <select name="Season" class="bg-slate-800  border rounded-lg p-2 w-full" bind:value={event.season}>
                <option value="test">Test Event</option>
                <option  value="25-26_Unearthed">Unearthed 2025-2026</option>
            </select>
            <label for="type" class="text-center text-md">Select a Type</label>
            <select name="Type" class="bg-slate-800  border rounded-lg p-2 w-full" bind:value={event.type}>
                <option value="test">Test Event</option>
                <option  value="regional">Regional</option>
                <option  value="super_regional">Super Regional</option>
            </select>
        </div>
        <div class="w-1/2 h-full">
            <h1 class="text-center text-2xl font-bold">Teams</h1>
            <div class="flex flex-wrap justify-center items-center gap-4 border min-h-3/4 rounded-lg my-2">
                {#each event.team_numbers as team_number}
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <div class="flex justify-center items-center border rounded-md px-3 py-1 my-2 relative">
                        <h1 class="text-center text-xl font-bold">{team_number}</h1>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button class="absolute top-0 right-0 bg-transparent hover:text-red-600 stroke-green-200" on:click={() => event.team_numbers = event.team_numbers.filter((team: number) => team !== team_number)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                {/each}
            </div>
            <Button text="Add Team" classContent={addTeamPopup ? "hidden" : ""} onClick={() => addTeamPopup = true} />
        </div>
        
    </div>
    <div class="flex justify-center mt-[2%]">
        <Button text={type==="update" ? "Update Event" : "Create Event"} onClick={() => saveEvent()} />
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="{addTeamPopup ? "block" : "hidden"} absolute top-0 left-1/4 w-[50%] h-[100%] border rounded-lg z-10">
        <h1 class="text-center text-2xl">Select Team(s) to Add</h1>
        {#await getAllTeams()}
            <p>Loading...</p>
        {:then teams}
            {#each teams as team}
                <button class="flex justify-center items-center w-fit p-2 border rounded-md hover:cursor-pointer hover:bg-slate-700 hover:text-green-300 {team.selected? "bg-slate-700 text-green-300" : ""}" on:click={() => {
                    if(event.team_numbers.indexOf(team.number) == -1) {
                        event.team_numbers.push(team.number);
                        team.selected = true;
                        console.log(event.team_numbers)
                    }
                    else {
                        event.team_numbers = event.team_numbers.filter((old_team: number) => old_team !== team.number);
                        team.selected = false;
                        console.log(event.team_numbers)
                    }
                }} >
                    <h1 class="text-center text-xl font-bold">{team.number}</h1>
                </button>
            {/each}
        {/await}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={() => addTeamPopup = false} class=" text-green-200 hover:text-red-600 font-bold py-2 px-4 rounded w-fit absolute top-0 right-0 z-10"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</div>