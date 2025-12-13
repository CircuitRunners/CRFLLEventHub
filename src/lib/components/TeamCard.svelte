<script lang='ts'>
	import AnimatedInputLabel from './AnimatedInputLabel.svelte';
	import { deleteTeam, updateTeam } from "$lib/db";
	import Button from './Button.svelte';

    export let team;
    export let type = "update";
    export let createTeam = async(team: any) => {};
    export let close = async(team: any) => {};
    const saveTeam = async () => {
        if( type === "update") {
            let data = await updateTeam(team);
            console.log(data)
        }
        else if (type === "create") {
            let data = await createTeam(team);
            console.log(data)
        }
    }
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="border rounded-lg p-4 h-fit w-full bg-slate-800 relative">
    <AnimatedInputLabel name="Team Name" bind:value={team.name} labelbg='bg-slate-800' mt="my-4"></AnimatedInputLabel>
    <AnimatedInputLabel type="number" name="Team Number" bind:value={team.number} labelbg='bg-slate-800' mt="my-4"></AnimatedInputLabel>
    <AnimatedInputLabel name="Team Password" bind:value={team.password} labelbg='bg-slate-800' mt="my-4"></AnimatedInputLabel>
    <div class="flex justify-center mt-[2%]">
        <Button text={type==="update" ? "Update Team" : "Create Team"} onClick={saveTeam} />
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button on:click={close} class=" text-green-200 hover:text-red-600 font-bold py-2 px-4 rounded w-fit absolute top-0 right-0 z-10"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    </button>
</div>    