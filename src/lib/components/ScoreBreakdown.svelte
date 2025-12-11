<script lang="ts">
	import type { Score } from "$lib";
	import { createScore, updateMatch, updateScore } from "$lib/db";
    import { blankScore } from "$lib/index";
	import AsyncButton from "./AsyncButton.svelte";
	import Button from "./Button.svelte";
    export let score: Score = blankScore;
    export let match: any;
    export let isEditing: boolean = true;
    const saveScore = async () => {
        console.log(score)
        if(score.id) {
            console.log("updating")
            let data = await updateScore(score);
            console.log(data)
        } else {
            console.log("creating")
            // console.log(score)
            let data = await createScore(score);
            console.log(data)
            score = data as unknown as Score;
            console.log(score.id)
            match.table.score = score.id;
            // console.log(table)
            console.log(match)
            await updateMatch(match);
        }
    };

    const calculate_total = (score: Score) => {
        let total = 0;
        // Equipment Inspection
        total += score.equipment_inspection ? 20 : 0;
        
        if (!score.equipment_inspection) {
            score.total = 0;
            return;
        }

        //Mission 01 - Surface Brushing
        total += score.mission01!.part1 ? 10 * score.mission01!.part1 : 0;
        total += score.mission01!.part2 ? 10 : 0; 
        //Mission 02 - Map Reveal
        total += score.mission02!.part1 ? 10 * score.mission02!.part1 : 0;
        //Mission 03 - Mineshaft Explorer
        total += score.mission03!.part1 ? 30 : 0;
        total += score.mission03!.part2 && score.mission03!.part1 ? 10 : 0;
        //Mission 04 - Careful Recovery
        total += score.mission04!.part1 ? 30 : 0;
        total += score.mission04!.part2 ? 10 : 0;
        //Mission 05 - Who Lived Here?
        total += score.mission05!.part1 ? 30 : 0;
        //Mission 06 - Forge
        total += score.mission06!.part1 ? 10 * score.mission06!.part1 : 0;
        //Mission 07 - Heavy Lifting
        total += score.mission07!.part1 ? 30 : 0;
        //Mission 08 - Silo
        total += score.mission08!.part1 ? 10 * score.mission08!.part1 : 0;

        //Mission 09 - What's on Sale?
        total += score.mission09!.part1 ? 20 : 0;
        total += score.mission09!.part2 ? 10 : 0;
        //Mission 10 - Tip the Scales
        total += score.mission10!.part1 ? 20 : 0;
        total += score.mission10!.part2 ? 10 : 0;
        //Mission 11 - Angler Artifacts
        total += score.mission11!.part1 ? 20 : 0;
        total += score.mission11!.part2  && score.mission11!.part1 ? 10 : 0;
        //Mission 12 - Salvage Operation
        total += score.mission12!.part1 ? 20 : 0;
        total += score.mission12!.part2 ? 10 : 0;
        //Mission 13 - Statue Rebuild
        total += score.mission13!.part1 ? 30 : 0;
        //Mission 14 - Forum
        total += score.mission14!.part1 ? 5 * score.mission14!.part1 : 0;
        //Mission 15 - Site Marking
        total += score.mission15!.part1 ? 10 * score.mission15!.part1 : 0;
        let tokens = score.precision_tokens;
        switch (tokens) {
            case 0:
                total += 0;
                break;
            case 1:
                total += 10;
                break;
            case 2:
                total += 15;
                break;
            case 3:
                total += 25;
                break;
            case 4:
                total += 35;
                break;
            case 5:
                total += 50;
                break;
            case 6:
                total += 50;
                break;
        }
        
        score.total = total;
    }

    $: calculate_total(score)
</script>

<div class="w-full h-fit flex flex-col items-center rounded-2xl">
    <div class="fixed w-full flex flex-col items-center z-10 bg-black">
        <h1 class="text-3xl font-extrabold h-fit">FLL UNEARTHED SCORER</h1>
        <div class="flex items-center gap-4 p-2">
            <div class="p-2">
                <p class="text-2xl font-bold">Total Score: <span class=" px-4 py-2 border border-slate-600">{score.total}</span> </p>  
            </div>
        </div>
    </div>
    <div class=" mt-[10%] w-3/4 h-fit p-[2%] flex flex-col bg-slate-800 justify-center items-center border rounded-2xl" id="equipment_inspection">
        <h1 class="text-2xl font-bold">
            Equipment Inspection
        </h1>
        <div>
            <p>The robot and all equipment fit completely in one launch area and under the height limit
            </p>
        </div>
        <div class="flex flex-row pt-4 justify-center items-center gap-2">
            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.equipment_inspection === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.equipment_inspection = false}>No</button>
            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.equipment_inspection === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.equipment_inspection = true}>Yes</button>
        </div>
    </div>
    <div class="w-[80%] h-fit p-[2%] flex flex-row bg-slate-800 mt-4 justify-center items-center border rounded-2xl">
        <div class="w-1/2 flex flex-col gap-4 pl-[10%] justify-start" id="missions1-8">
            <div class="" id="mission01">
                <h1 class="text-2xl font-bold">
                    Mission 01 - Surface Brushing
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Soil deposits completely cleared, touching the mat
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        {#each [0, 1, 2] as i}
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission01!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission01!.part1 = i}>{i}</button>
                        {/each}
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Archaeologist{"’"}s brush is not touching the dig site
    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission01!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission01!.part2 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission01!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission01!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            <div class="" id="mission02">
                <h1 class="text-2xl font-bold">
                    Mission 02 - Map Reveal
                </h1>
                <div class="flex flex-col gap-2  p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Topsoil sections completely cleared
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission02!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission02!.part1 = i}>{i}</button>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="" id="mission03">
                <h1 class="text-2xl font-bold">
                    Mission 03 - Mineshaft Explorer
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Your team’s minecart is on the opposing team’s field
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission03!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => {score.mission03!.part1 = false; score.mission03!.part2 = false}}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission03!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission03!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Bonus: and the opposing team’s minecart is on your team’s field    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""}  {score.mission03!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" disabled={!(isEditing && score.mission03!.part1)} on:click={() => score.mission03!.part2 = false}>No</button>
                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""}  {score.mission03!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" disabled={!(isEditing && score.mission03!.part1)} on:click={() => score.mission03!.part2 = true}>Yes</button>
                    </div>
            </div>
            </div>
            <div class="" id="mission04">
                <h1 class="text-2xl font-bold">
                    Mission 04 - Careful Recovery
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Precious artifact is not touching the mine
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission04!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission04!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission04!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission04!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Both support structures are standing    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission04!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission04!.part2 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission04!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission04!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            <div class="" id="mission05">
                <h1 class="text-2xl font-bold">
                    Mission 05 - Who Lived Here?
                </h1>
                <div class="flex flex-col gap-2 p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Structure floor is completely upright
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission05!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission05!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission05!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission05!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
            </div>
            <div class="" id="mission06">
                <h1 class="text-2xl font-bold">
                    Mission 06 - Forge
                </h1>
                <div class="flex flex-col gap-2  p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Ore blocks not touching the forge
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission06!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission06!.part1 = i}>{i}</button>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="" id="mission07">
                <h1 class="text-2xl font-bold">
                    Mission 07 - Heavy Lifting
                </h1>
                <div class="flex flex-col gap-2 p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Millstone is no longer touching its base
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission07!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission07!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission07!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission07!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
            </div>
            <div class="" id="mission08">
                <h1 class="text-2xl font-bold">
                    Mission 08 - Silo
                </h1>
                <div class="flex flex-col gap-2  p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Preserved pieces outside the silo
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission08!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission08!.part1 = i}>{i}</button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 flex flex-col gap-4 pl-[10%] justify-start" id="missions9-15">
            <div class="" id="mission09">
                <h1 class="text-2xl font-bold">
                    Mission 09 - What's on Sale?
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Roof is completely raised
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission09!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission09!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission09!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission09!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Market wares are raised    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission09!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission09!.part2 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission09!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission09!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            <div class="" id="mission10">
                <h1 class="text-2xl font-bold">
                    Mission 10 - Tip the Scales
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Scale is tipped and touching the mat
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission10!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission10!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission10!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission10!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Scale pan is completely removed    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission10!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission10!.part2 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission10!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission10!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            <div class="" id="mission11">
                <h1 class="text-2xl font-bold">
                    Mission 11 - Angler Artifacts
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Artifacts are raised above the ground layer
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission11!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => {score.mission11!.part1 = false; score.mission11!.part2 = false} }>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission11!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission11!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Bonus: and the crane flag is at least partly lowered    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission11!.part2 === false ? "bg-red-500 text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""} transition-colors" disabled={!(isEditing && score.mission11!.part1)} on:click={() => score.mission11!.part2 = false}>No</button>
                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission11!.part2 === true ? "bg-green-500 text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""} transition-colors" disabled={!(isEditing && score.mission11!.part1)} on:click={() => score.mission11!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            <div class="" id="mission12">
                <h1 class="text-2xl font-bold">
                    Mission 12 - Salvage Operation
                </h1>
                <div class="flex flex-col gap-2 border-b p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Sand is completely cleared
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission12!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission12!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission12!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission12!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-3/4 p-2">
                    <div>
                        <p>Ship is completely raised    
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission12!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission12!.part2 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission12!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission12!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            <div class="" id="mission13">
                <h1 class="text-2xl font-bold">
                    Mission 13 - Statue Rebuild
                </h1>
                <div class="flex flex-col gap-2 p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Statue is completely raised
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.mission13!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.mission13!.part1 = false}>No</button>
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission13!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission13!.part1 = true}>Yes</button>
                    
                    </div>
                </div>
            </div>
            <div class="" id="mission14">
                <h1 class="text-2xl font-bold">
                    Mission 14 - Forum
                </h1>
                <div class="flex flex-col gap-2  p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Artifacts touching the mat and at least partly in the forum
                        </p>
                        <p class="italic">(Artifacts: Brush, Topsoil, Precious Artifact, Opposing Team’s Minecart, Ore with Fossilized Artifact, Millstone, & Scale Pan)</p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        {#each [0, 1, 2, 3, 4, 5, 6, 7] as i}
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission14!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission14!.part1 = i}>{i}</button>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="" id="mission15">
                <h1 class="text-2xl font-bold">
                    Mission 15 - Site Marking
                </h1>
                <div class="flex flex-col gap-2  p-2 border-slate-700 w-3/4">
                    <div>
                        <p>Sites with a flag at least partly inside and touching the mat
                        </p>
                    </div>
                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                        {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.mission15!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.mission15!.part1 = i}>{i}</button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-3/4 h-fit p-[2%] flex flex-col bg-slate-800 mt-4 justify-center items-center border rounded-2xl" id="precision_tokens">
        <h1 class="text-2xl font-bold">
            Precision Tokens
        </h1>
        <div>
            <p>Number of precision tokens remaining
            </p>
        </div>
        <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
            {#each [0, 1, 2, 3, 4, 5, 6] as i}
            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.precision_tokens === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.precision_tokens = i}>{i}</button>
            {/each}
        </div>
    </div>
    <div class="w-3/4 h-fit p-[2%] flex flex-col bg-slate-800 mt-4 justify-center items-center border rounded-2xl" id="gracious_professionalism">
        <h1 class="text-2xl font-bold">
            Gracious Professionalism
        </h1>
        <div>
            <p>The robot and all equipment fit completely in one launch area and under the height limit
            </p>
        </div>
        <div class="flex flex-row pt-4 justify-center items-center gap-2">
            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {score.gracious_professionalism === 2 ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => score.gracious_professionalism = 2}>Developing</button>
            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 hover:bg-orange-500 hover:text-white {score.gracious_professionalism === 3 ? "bg-orange-500 text-white" : ""} transition-colors" on:click={() => score.gracious_professionalism = 3}>Accomplished</button>
            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {score.gracious_professionalism === 4 ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => score.gracious_professionalism = 4}>Exceeds</button>
        </div>
    </div>
    <AsyncButton text="Save Score" classContent="mt-2" onClick={saveScore}></AsyncButton>
</div>