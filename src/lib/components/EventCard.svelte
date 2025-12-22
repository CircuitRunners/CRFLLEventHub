<script lang='ts'>
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

    // Force UI update by re-assigning the event object
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
        // Assignment triggers the UI update
        event = { ...event, team_numbers: newTeams };
    };

    const saveEvent = async () => {
        if (type === "update") {
            await updateEvent(event);
        } else if (type === "create") {
            await createEvent(event);
        }
    };

    const getAllTeams = async () => {
        let data = await getTeams();
        return data || [];
    };
</script>

<div class="border border-slate-700 rounded-2xl p-6 h-fit w-full {event.live ? 'bg-slate-700' : 'bg-slate-800'} relative shadow-xl transition-colors duration-300">
    
    <div class="{addTeamPopup ? 'blur-xl opacity-50 pointer-events-none' : 'blur-0'} transition-all duration-300">
        <div class="flex flex-col md:flex-row justify-between gap-8">
            
            <div class="w-full md:w-1/2 flex flex-col gap-4">
                <h2 class="text-xl font-bold text-green-400 mb-2">Event Details</h2>
                
                <div class="flex flex-col gap-1">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-sm font-semibold text-slate-400">Season</label>
                    <select class="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-green-500" 
                        bind:value={event.season}>
                        <option value="Test">Test Event</option>
                        <option value="Unearthed 2025-2026">Unearthed 2025-2026</option>
                    </select>
                </div>

                <div class="flex flex-col gap-1">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-sm font-semibold text-slate-400">Status</label>
                    <div class="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
                        <button 
                            class="flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer {event.live === false ? 'bg-red-500 text-white shadow-lg' : 'text-slate-500 hover:text-red-400'}"
                            onclick={() => updateStatus(false)}>DRAFT</button>
                        <button 
                            class="flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer {event.live === true ? 'bg-green-500 text-white shadow-lg' : 'text-slate-500 hover:text-green-400'}"
                            onclick={() => updateStatus(true)}>LIVE</button>
                    </div>
                </div>
            </div>

            <div class="w-full md:w-1/2 flex flex-col">
                <h2 class="text-xl font-bold text-green-400 mb-4">Teams ({event.team_numbers.length})</h2>
                <div class="flex flex-wrap gap-2 p-4 bg-slate-900/50 border border-slate-700 rounded-2xl min-h-[150px] content-start">
                    {#each event.team_numbers as team_number}
                        <div class="flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 hover:border-green-500 transition-colors">
                            <span class="text-lg font-bold text-white">{team_number}</span>
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button class="text-slate-400 hover:text-red-500" onclick={() => toggleTeam(team_number)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    {/each}
                </div>
                <div class="mt-4">
                    <Button text="Add / Remove Teams" onClick={() => addTeamPopup = true} />
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-8 border-t border-slate-700 pt-6">
            <Button text={type === "update" ? "Update Event" : "Create Event"} onClick={saveEvent} />
        </div>
    </div>

    {#if addTeamPopup}
        <div class="absolute inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
            <div class="bg-slate-900 border border-green-500/50 rounded-2xl p-6 w-full h-full flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-green-400">Manage Team List</h1>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button onclick={() => addTeamPopup = false} class="text-slate-400 hover:text-red-500 transition-transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto">
                    {#await getAllTeams()}
                        <div class="h-full flex items-center justify-center text-slate-500">Loading DB...</div>
                    {:then teams}
                        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {#each teams as team}
                                <button 
                                    class="p-4 rounded-xl border-2 font-bold text-xl transition-all
                                    {event.team_numbers.includes(team.number) 
                                        ? 'bg-green-600 border-green-400 text-white scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}"
                                    onclick={() => toggleTeam(team.number!)}
                                >
                                    {team.number}
                                </button>
                            {/each}
                        </div>
                    {/await}
                </div>
                
                <div class="mt-6 flex justify-center">
                    <Button text="Close Picker" onClick={() => addTeamPopup = false} />
                </div>
            </div>
        </div>
    {/if}

    <div class="absolute top-4 right-4 flex gap-1">
        {#if type === "update"}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button onclick={() => goto(`/edit/events/${event.id}`)} class="p-2 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>          
            </button>
        {/if}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button onclick={() => closeEventPopup()} class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    </div>
</div>