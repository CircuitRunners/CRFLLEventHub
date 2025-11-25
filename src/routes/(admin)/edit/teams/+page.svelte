<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import TeamCard from "$lib/components/TeamCard.svelte";
	import { createTeam, deleteTeam, getTeams } from "$lib/db";
	import { onMount } from "svelte";

    let newTeamDisplay = false;
    let newTeam = {
        name: "",
        number: 0,
        password: "",
    };
    let teams: any[] = [newTeam];
    onMount(async () => {
        teams = await getTeams() || [];
    });
    const addNewTeam = async () => {
        if(teams!.map((team: any) => team.number).indexOf(newTeam.number) != -1) {
            alert("Team with that number already exists")
            return;
        }
        await createTeam(newTeam);
        newTeamDisplay = false;
        teams = [...teams, newTeam];
        newTeam = {
            name: "",
            number: 0,
            password: "",
        }
    }
</script>

<div class="flex flex-col justify-center bg-black items-center overflow-scroll pb-[10%]">
    <h1 class="text-3xl font-bold">Teams</h1>
    <div class="flex flex-col justify-center items-center w-1/2 gap-4 mt-4">
        {#each teams as team}
            <TeamCard team={team} close={async() => {
                teams = teams.filter((old_team: any) => old_team.number !== team.number);
                console.log(teams)
                await deleteTeam(team.number)
            }} />
        {/each}
        <Button text="Create Team" onClick={() => newTeamDisplay = true} />
        {#if newTeamDisplay}
            <h1 class="text-2xl font-bold">Create Team</h1>
            <TeamCard team={newTeam} createTeam={addNewTeam} close={async() => {newTeamDisplay = false} } type="create"></TeamCard>
            <br>
        {/if}
    </div>
</div>