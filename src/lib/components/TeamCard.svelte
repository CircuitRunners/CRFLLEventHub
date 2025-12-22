<script lang='ts'>
    import { deleteTeam, updateTeam } from "$lib/db";
    import Button from './Button.svelte';

    // Svelte 5 Props
    let { 
        team = $bindable(), 
        type = "update", 
        createTeam = async (t: any) => {}, 
        close = async () => {} 
    } = $props();

    const saveTeam = async () => {
        if (type === "update") {
            await updateTeam(team);
        } else if (type === "create") {
            await createTeam(team);
        }
    }
</script>

<div class="border border-slate-700 rounded-3xl p-8 h-fit w-full bg-slate-800 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-slate-500">
    <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-500/5 blur-[100px] pointer-events-none"></div>

    <div class="flex flex-col gap-6">
        <header class="mb-2">
            <h2 class="text-2xl font-black text-white uppercase tracking-tighter italic">
                {type === "update" ? "Edit Team" : "Register Team"}
            </h2>
            <div class="h-1 w-12 bg-green-500 rounded-full mt-1"></div>
        </header>

        <div class="grid grid-cols-1 gap-5">
            <div class="flex flex-col gap-2">
                <label for="name" class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Team Identity</label>
                <input 
                    id="name"
                    type="text" 
                    placeholder="Enter team name..."
                    class="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-bold focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-700"
                    bind:value={team.name} 
                />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="flex flex-col gap-2">
                    <label for="number" class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Team #</label>
                    <input 
                        id="number"
                        type="number" 
                        placeholder="0000"
                        class="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white text-xl font-black focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-slate-700"
                        bind:value={team.number} 
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="pass" class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
                    <input 
                        id="pass"
                        type="text" 
                        placeholder="Password"
                        class="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-mono focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-slate-700"
                        bind:value={team.password} 
                    />
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-4 pt-6 border-t border-slate-700/50">
            <Button 
                text={type === "update" ? "Update Records" : "Confirm Registration"} 
                onClick={saveTeam} 
            />
        </div>
    </div>

    <button 
        onclick={() => close()}
        class="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-500 transition-all hover:rotate-90"
        title="Close or Delete"
    > 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</div>