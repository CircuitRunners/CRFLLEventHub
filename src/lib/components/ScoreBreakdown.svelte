<script lang="ts">
	import type { Score } from "$lib";
	import { createScore, getMatch, updateMatch, updateScore, updateTeam } from "$lib/db";
	import { blankScore } from "$lib/index";
	import AsyncButton from "./AsyncButton.svelte";
	import Button from "./Button.svelte";
    export let score: Score = blankScore;
    export let match: any;
    export let isEditing: boolean = true;
    export let table = "";
    export let team;
    
    // Logic from original component
    const saveScore = async () => {
        console.log(score)
        if(score.id) {
            console.log("updating")
            let data = await updateScore(score);
            console.log(data)
            // let current_score_total = score.total || 0;
            // let a = ["hello", {word: "world"}, "blu"]
            // console.log(a.find((x: any) => x.word == "world"))
            // console.log(team.highest_score_by_event.find((x: any) => x.event_id == match.event_id))
            // // console.log(team.highest_score_by_event)
            // let team_highest_score_details = team.highest_score_by_event.find((x: any) => x.event_id == match.event_id);
            // // console.log(team_highest_score_details)
            // let team_highest_score = team_highest_score_details ? team_highest_score_details.score : null;
            // console.log("team_highest " + team_highest_score)
            // console.log( "score_total " + current_score_total)
            // if(team_highest_score < current_score_total) {
            //     console.log("current score higher")
            //     team.highest_score_by_event = team.highest_score_by_event.filter((x: any) => x != team_highest_score_details)
            //     team.highest_score_by_event = [...team.highest_score_by_event, {event_id: match.event_id, score: current_score_total, score_id: score.id}];
            //     let data = await updateTeam(team);
            // } else if (team_highest_score === null || team_highest_score_details.match_id === match.id) {
            //     team.highest_score_by_event = team.highest_score_by_event.filter((x: any) => x != team_highest_score_details)
            //     team.highest_score_by_event = [...team.highest_score_by_event, {event_id: match.event_id, score: current_score_total, score_id: score.id}];
            //     let data = await updateTeam(team);
            // }
            alert("Score Saved")
        } else {
            console.log("creating")
            let data = await createScore(score);
            score = data as unknown as Score;
            console.log(score)
            match = (await getMatch(match.id) || [])[0];
            match[table].score = score.id;
            match = await updateMatch(match);
            if(match[table].score !== score.id) {
                alert("match score not updated")
                return
            }
            alert("Score Saved")
            // let current_score_total = score.total || 0;
            // team.highest_score_by_event = [];
            // let team_highest_score_details = team.highest_score_by_event.find((x: any) => x.event_id == match.event_id);
            // console.log(team_highest_score_details)
            // let team_highest_score = team_highest_score_details ? team_highest_score_details.score : null;
            // if(team_highest_score < current_score_total) {
            //     team.highest_score_by_event = team.highest_score_by_event.filter((x: any) => x != team_highest_score_details)
            //     team.highest_score_by_event = [...team.highest_score_by_event, {event_id: match.event_id, score: current_score_total, score_id: score.id}];
            //     let data = await updateTeam(team);
            // } else if (team_highest_score === null) {
            //     team.highest_score_by_event = team.highest_score_by_event.filter((x: any) => x != team_highest_score_details)
            //     team.highest_score_by_event = [...team.highest_score_by_event, {event_id: match.event_id, score: current_score_total, score_id: score.id}];
            //     let data = await updateTeam(team);
            // }
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
        total += score.mission01!.part1 ?
        10 * score.mission01!.part1 : 0;
        total += score.mission01!.part2 ? 10 : 0;
        //Mission 02 - Map Reveal
        total += score.mission02!.part1 ?
        10 * score.mission02!.part1 : 0;
        //Mission 03 - Mineshaft Explorer
        total += score.mission03!.part1 ?
        30 : 0;
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
        total += score.mission11!.part1 ?
        20 : 0;
        total += score.mission11!.part2  && score.mission11!.part1 ? 10 : 0;
        //Mission 12 - Salvage Operation
        total += score.mission12!.part1 ? 20 : 0;
        total += score.mission12!.part2 ? 10 : 0;
        //Mission 13 - Statue Rebuild
        total += score.mission13!.part1 ?
        30 : 0;
        //Mission 14 - Forum
        total += score.mission14!.part1 ?
        5 * score.mission14!.part1 : 0;
        //Mission 15 - Site Marking
        total += score.mission15!.part1 ?
        10 * score.mission15!.part1 : 0;
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

<div class="w-full max-w-7xl mx-auto h-fit flex flex-col items-center {isEditing ? "" : "overflow-auto"} relative p-2 sm:p-4">
    <header class="w-full flex flex-col items-center z-20 bg-black/90 p-3 rounded-b-lg mb-4 
        shadow-xl backdrop-blur-sm
        {isEditing ? 'fixed top-0' : ''}"
    >
        <h1 class="text-3xl font-extrabold h-fit">Score Breakdown</h1>
        <div class="flex items-center gap-4 mt-2">
            <p class="text-xl sm:text-2xl font-bold">
                Total Score: 
                <span class="inline-block px-4 py-1.5 border-2 border-slate-600 rounded-lg bg-slate-900 ml-2">
                    {score.total}
                </span>
            </p>  
        </div>
    </header>

    <div class="w-full md:w-3/4 max-w-lg p-4 flex flex-col bg-slate-800 justify-center items-center border border-slate-700 rounded-xl shadow-lg mb-4" id="equipment_inspection"> 
        <h2 class="text-xl font-bold mb-2">
            Equipment Inspection
        </h2>
        <p class="text-center text-slate-300 mb-4">
            The robot and all equipment fit completely in one launch area and under the height limit
        </p>
        <div class="flex flex-row pt-2 justify-center items-center gap-4">
            <button disabled={!isEditing} 
                class="px-6 py-2 rounded-lg text-md font-semibold transition-colors 
                bg-gray-700 hover:bg-red-600 hover: 
                disabled:opacity-50 disabled:cursor-not-allowed
                {score.equipment_inspection === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                on:click={() => score.equipment_inspection = false}>
                No
            </button>
            <button disabled={!isEditing} 
                class="px-6 py-2 rounded-lg text-md font-semibold transition-colors 
                bg-gray-700 hover:bg-green-600 hover:
                disabled:opacity-50 disabled:cursor-not-allowed
                {score.equipment_inspection === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                on:click={() => score.equipment_inspection = true}>
                Yes
            </button>
        </div>
    </div>
    
    <div class="w-full flex flex-col md:flex-row gap-4 p-2">
        
        <div class="w-full md:w-1/2 flex flex-col gap-4" id="missions1-8">
            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission01">
                <h2 class="text-xl font-bold mb-3 ">Mission 01 - Surface Brushing</h2>
                
                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Soil deposits completely cleared, touching the mat (Count: 0-2)</p>
                    <div class="flex justify-start gap-2">
                        {#each [0, 1, 2] as i}
                            <button disabled={!isEditing} 
                                class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                                bg-gray-700 hover:bg-green-600 hover:
                                disabled:opacity-50 disabled:cursor-not-allowed
                                {score.mission01!.part1 === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                                on:click={() => score.mission01!.part1 = i}>
                                {i}
                            </button>
                        {/each}
                    </div>
                </div>
                
                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Archaeologist’s brush is not touching the dig site</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission01!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission01!.part2 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission01!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission01!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission02">
                <h2 class="text-xl font-bold mb-3 ">Mission 02 - Map Reveal</h2>
                <p class="text-slate-300 mb-2">Topsoil sections completely cleared (Count: 0-3)</p>
                <div class="flex justify-start gap-2">
                    {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} 
                            class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission02!.part1 === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission02!.part1 = i}>
                            {i}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission03">
                <h2 class="text-xl font-bold mb-3 ">Mission 03 - Mineshaft Explorer</h2>
                
                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Your team’s minecart is on the opposing team’s field</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission03!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => {score.mission03!.part1 = false; score.mission03!.part2 = false}}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission03!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission03!.part1 = true}>Yes</button>
                    </div>
                </div>

                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Bonus: and the opposing team’s minecart is on your team’s field</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!(isEditing && score.mission03!.part1)} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed
                            {score.mission03!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission03!.part2 = false}>No</button>
                        <button disabled={!(isEditing && score.mission03!.part1)} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed
                            {score.mission03!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission03!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>
            
            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission04">
                <h2 class="text-xl font-bold mb-3 ">Mission 04 - Careful Recovery</h2>
                
                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Precious artifact is not touching the mine</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission04!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission04!.part1 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission04!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission04!.part1 = true}>Yes</button>
                    </div>
                </div>
                
                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Both support structures are standing</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission04!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission04!.part2 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission04!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission04!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission05">
                <h2 class="text-xl font-bold mb-3 ">Mission 05 - Who Lived Here?</h2>
                <p class="text-slate-300 mb-2">Structure floor is completely upright</p>
                <div class="flex justify-start gap-4">
                    <button disabled={!isEditing} 
                        class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                        bg-gray-700 hover:bg-red-600 hover:
                        disabled:opacity-50 disabled:cursor-not-allowed
                        {score.mission05!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                        on:click={() => score.mission05!.part1 = false}>No</button>
                    <button disabled={!isEditing} 
                        class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                        bg-gray-700 hover:bg-green-600 hover:
                        disabled:opacity-50 disabled:cursor-not-allowed
                        {score.mission05!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                        on:click={() => score.mission05!.part1 = true}>Yes</button>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission06">
                <h2 class="text-xl font-bold mb-3 ">Mission 06 - Forge</h2>
                <p class="text-slate-300 mb-2">Ore blocks not touching the forge (Count: 0-3)</p>
                <div class="flex justify-start gap-2">
                    {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} 
                            class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission06!.part1 === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission06!.part1 = i}>
                            {i}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission07">
                <h2 class="text-xl font-bold mb-3 ">Mission 07 - Heavy Lifting</h2>
                <p class="text-slate-300 mb-2">Millstone is no longer touching its base</p>
                <div class="flex justify-start gap-4">
                    <button disabled={!isEditing} 
                        class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                        bg-gray-700 hover:bg-red-600 hover:
                        disabled:opacity-50 disabled:cursor-not-allowed
                        {score.mission07!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                        on:click={() => score.mission07!.part1 = false}>No</button>
                    <button disabled={!isEditing} 
                        class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                        bg-gray-700 hover:bg-green-600 hover:
                        disabled:opacity-50 disabled:cursor-not-allowed
                        {score.mission07!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                        on:click={() => score.mission07!.part1 = true}>Yes</button>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission08">
                <h2 class="text-xl font-bold mb-3 ">Mission 08 - Silo</h2>
                <p class="text-slate-300 mb-2">Preserved pieces outside the silo (Count: 0-3)</p>
                <div class="flex justify-start gap-2">
                    {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} 
                            class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission08!.part1 === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission08!.part1 = i}>
                            {i}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        
        <div class="w-full md:w-1/2 flex flex-col gap-4" id="missions9-15">
            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission09">
                <h2 class="text-xl font-bold mb-3 ">Mission 09 - What's on Sale?</h2>
                
                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Roof is completely raised</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission09!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission09!.part1 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission09!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission09!.part1 = true}>Yes</button>
                    </div>
                </div>

                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Market wares are raised</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission09!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission09!.part2 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission09!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission09!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission10">
                <h2 class="text-xl font-bold mb-3 ">Mission 10 - Tip the Scales</h2>

                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Scale is tipped and touching the mat</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission10!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission10!.part1 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission10!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission10!.part1 = true}>Yes</button>
                    </div>
                </div>

                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Scale pan is completely removed</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission10!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission10!.part2 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission10!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission10!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission11">
                <h2 class="text-xl font-bold mb-3 ">Mission 11 - Angler Artifacts</h2>
                
                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Artifacts are raised above the ground layer</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission11!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => {score.mission11!.part1 = false; score.mission11!.part2 = false} }>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission11!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission11!.part1 = true}>Yes</button>
                    </div>
                </div>

                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Bonus: and the crane flag is at least partly lowered</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!(isEditing && score.mission11!.part1)} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed
                            {score.mission11!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission11!.part2 = false}>No</button>
                        <button disabled={!(isEditing && score.mission11!.part1)} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed
                            {score.mission11!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission11!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission12">
                <h2 class="text-xl font-bold mb-3 ">Mission 12 - Salvage Operation</h2>
                
                <div class="pb-3 border-b border-slate-700 mb-3">
                    <p class="text-slate-300 mb-2">Sand is completely cleared</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission12!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission12!.part1 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission12!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission12!.part1 = true}>Yes</button>
                    </div>
                </div>

                <div class="pt-3">
                    <p class="text-slate-300 mb-2">Ship is completely raised</p>
                    <div class="flex justify-start gap-4">
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-red-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission12!.part2 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission12!.part2 = false}>No</button>
                        <button disabled={!isEditing} 
                            class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission12!.part2 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission12!.part2 = true}>Yes</button>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission13">
                <h2 class="text-xl font-bold mb-3 ">Mission 13 - Statue Rebuild</h2>
                <p class="text-slate-300 mb-2">Statue is completely raised</p>
                <div class="flex justify-start gap-4">
                    <button disabled={!isEditing} 
                        class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                        bg-gray-700 hover:bg-red-600 hover:
                        disabled:opacity-50 disabled:cursor-not-allowed
                        {score.mission13!.part1 === false ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                        on:click={() => score.mission13!.part1 = false}>No</button>
                    <button disabled={!isEditing} 
                        class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                        bg-gray-700 hover:bg-green-600 hover:
                        disabled:opacity-50 disabled:cursor-not-allowed
                        {score.mission13!.part1 === true ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                        on:click={() => score.mission13!.part1 = true}>Yes</button>
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission14">
                <h2 class="text-xl font-bold mb-3 ">Mission 14 - Forum</h2>
                <p class="text-slate-300 mb-2">Artifacts touching the mat and at least partly in the forum (Count: 0-7)</p>
                <p class="italic text-sm text-slate-400 mb-3">(Artifacts: Brush, Topsoil, Precious Artifact, Opposing Team’s Minecart, Ore with Fossilized Artifact, Millstone, & Scale Pan)</p>
                <div class="flex justify-start gap-2 flex-wrap">
                    {#each [0, 1, 2, 3, 4, 5, 6, 7] as i}
                        <button disabled={!isEditing} 
                            class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission14!.part1 === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission14!.part1 = i}>
                            {i}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg" id="mission15">
                <h2 class="text-xl font-bold mb-3 ">Mission 15 - Site Marking</h2>
                <p class="text-slate-300 mb-2">Sites with a flag at least partly inside and touching the mat (Count: 0-3)</p>
                <div class="flex justify-start gap-2">
                    {#each [0, 1, 2, 3] as i}
                        <button disabled={!isEditing} 
                            class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                            bg-gray-700 hover:bg-green-600 hover:
                            disabled:opacity-50 disabled:cursor-not-allowed
                            {score.mission15!.part1 === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                            on:click={() => score.mission15!.part1 = i}>
                            {i}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    
    <div class="w-full md:w-3/4 max-w-lg p-4 flex flex-col bg-slate-800 justify-center items-center border border-slate-700 rounded-xl shadow-lg mt-4" id="precision_tokens">
        <h2 class="text-xl font-bold  mb-2">
            Precision Tokens
        </h2>
        <p class="text-center text-slate-300 mb-4">
            Number of precision tokens remaining (Count: 0-6)
        </p>
        <div class="flex flex-row justify-center items-center gap-2 flex-wrap">
            {#each [0, 1, 2, 3, 4, 5, 6] as i}
                <button disabled={!isEditing} 
                    class="w-10 h-10 rounded-lg text-md font-semibold transition-colors 
                    bg-gray-700 hover:bg-green-600 hover:
                    disabled:opacity-50 disabled:cursor-not-allowed
                    {score.precision_tokens === i ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                    on:click={() => score.precision_tokens = i}>
                    {i}
                </button>
            {/each}
        </div>
    </div>

    <div class="w-full md:w-3/4 max-w-lg p-4 flex flex-col bg-slate-800 justify-center items-center border border-slate-700 rounded-xl shadow-lg mt-4 {isEditing ? "" : "hidden"}" id="gracious_professionalism">
        <h2 class="text-xl font-bold  mb-2">
            Gracious Professionalism
        </h2>
        <p class="text-center text-slate-300 mb-4">
            Team's demonstrated level of Gracious Professionalism
        </p>
        <div class="flex flex-row justify-center items-center gap-4">
            <button disabled={!isEditing} 
                class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                bg-gray-700 hover:bg-red-600 hover:
                disabled:opacity-50 disabled:cursor-not-allowed
                {score.gracious_professionalism === 2 ? 'bg-red-600  shadow-inner' : 'text-slate-200'}" 
                on:click={() => score.gracious_professionalism = 2}>
                Developing
            </button>
            <button disabled={!isEditing} 
                class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                bg-gray-700 hover:bg-orange-600 hover: 
                disabled:opacity-50 disabled:cursor-not-allowed
                {score.gracious_professionalism === 3 ? 'bg-orange-600  shadow-inner' : 'text-slate-200'}" 
                on:click={() => score.gracious_professionalism = 3}>
                Accomplished
            </button>
            <button disabled={!isEditing} 
                class="px-4 py-2 rounded-lg text-md font-semibold transition-colors 
                bg-gray-700 hover:bg-green-600 hover:
                disabled:opacity-50 disabled:cursor-not-allowed
                {score.gracious_professionalism === 4 ? 'bg-green-600  shadow-inner' : 'text-slate-200'}" 
                on:click={() => score.gracious_professionalism = 4}>
                Exceeds
            </button>
        </div>
    </div>

    <AsyncButton text="Save Score" 
        classContent="mt-6 w-full md:w-1/2 max-w-2xs {isEditing ? "" : "hidden"} 
        bg-indigo-600 hover:bg-indigo-700  
        py-3 rounded-xl text-lg font-bold shadow-2xl" 
        onClick={saveScore}>
    </AsyncButton>
</div>