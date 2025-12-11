<script lang='ts'>
	import { getMatch } from '$lib/db.js';
	import { onMount } from 'svelte';
    // import { Score } from "$lib";
    let {data} = $props()
    // console.log(data)
   
    let teamname = data.teamName;
    let teamnum = data.teamNum;
    let event = data.live_event;
    let matches = data.matches;
    console.log(matches)
    let allScores = data.scores
    console.log(allScores)
    let isEditing: boolean = false;

    // console.log(match);
    // console.log(events);
    // console.log("Team Number: " + teamnum);
//ok so the above code is just like not even working like pu lling data wrong

     let blankScore: Score = {
    total: 0,
    equipment_inspection: null,
    mission01: {
        part1: 1,
        part2: true,
    },
    mission02: {
        part1: null,
    },
    mission03: {
        part1: null,
        part2: null,
    },
    mission04: {
        part1: null,
        part2: null,
    },
    mission05: {
        part1: null,
    },
    mission06: {
        part1: null,
    },
    mission07: {
        part1: null,
    },
    mission08: {
        part1: null,
    },
    mission09: {
        part1: null,
        part2: null,
    },
    mission10: {
        part1: null,
        part2: null,
    },
    mission11: {
        part1: null,
        part2: null,
    },
    mission12: {
        part1: null,
        part2: null,
    },
    mission13: {
        part1: null,
    },
    mission14: {
        part1: null,
    },
    mission15: {
        part1: null,
    },
    precision_tokens: null,
    gracious_professionalism: 3,
};
    let score: Score = blankScore;

    let teamGames = []; // [round number, table number, match id]
    let i = 0;
    if (matches == null) {
        console.log("No matches found");
    }
    else{
        
        for (let m of (matches as any))  {
            i += 1;
            console.log("Match:");
            console.log(m);
 
            if (m.table1.team == teamnum) {               
    
                teamGames.push([i, 1, m.id])
            }
            else if (m.table2.team == teamnum) {
       
       
                teamGames.push([i, 2, m.id])
                }       
            else if (m.table3.team == teamnum) {
       
                teamGames.push([i, 3, m.id])
                }      
            else if (m.table4.team == teamnum) {
        
                teamGames.push([i, 4, m.id])
                }      
            else if (m.table5.team == teamnum) {

                teamGames.push([i, 5, m.id])
                }   
            else if (m.table6.team == teamnum) {
      
                teamGames.push([i, 6, m.id])

            }          
        }
        console.log(teamGames);
    }

    
    
    async function scoreCalc(id: number, table:number) {
        
        
        let a_match = await getMatch(id);
        let t: string = "table" + table;
        return a_match![t]!.score;
        
    }
    function getTeamScores(teamGames, allScores) {
    return teamGames.map(([round, table, matchId]) => {
        const score = allScores.find(
            s => s.table === table && s.match_id === matchId
        );

        return {
            round,
            table,
            matchId,
            score: score ?? null
        };
    });
}   

    
    const teamScores = getTeamScores(teamGames, allScores);
    console.log(teamScores);
    const onlyTotals = teamScores.map((x) => {
        if (x.score) {
            return x.score.total;
        } else {
            return 0
        }
    });

    let matchIds = teamGames.map((x) => x[2]);
    console.log("Match Ids:");
    console.log(matchIds);
    let scoresForTeamMatches = allScores.filter((score) => matchIds.includes(score.match_id));
    console.log("Scores for Team Matches:");
    console.log(scoresForTeamMatches);
    let tableIds = teamGames.map((x) => x[1]);
    console.log("Table Ids:");
    console.log(tableIds);

    

    function findScore(id, table){
        let scoring = [];
        for (let score of allScores){
            for (let tableId of tableIds){
                for (let matchId of matchIds){
                    if (score.table == tableId && score.match_id == matchId){
                         scoring.push(score);
                    }
                }
            }
            
        }
        return scoring;
    }

    let scoring = findScore(matchIds, tableIds);

    console.clear();
    console.log(scoring);

    score = scoring[0] || blankScore;

   



    

    

</script>
<div>
    <h2>
        Hello {teamname}!
    </h2>
    <p>
        Event {event.season} | {event.type}
    </p>
    <h3>
        Your Matches:
    </h3>
    {#if teamGames.length == 0}
        <p>No matches found for this team.</p>
    {:else}
        <ul>
            {#each teamGames as game}
                <li>Round {game[0]} - Table {game[1]} (Score: {onlyTotals[0]})</li>
            {/each}
        </ul>
    {/if}

   
    {#if scoring.length == 0}
        <p>No scores found for your matches.</p>
    {:else}
        <ul>
            {#each scoring as sc, index}
                
                
                <li>
                <div class="w-full h-fit flex flex-col items-center rounded-2xl">
                    
                        <h1 class="text-3xl font-extrabold h-fit">Match {index+1}</h1>
                        <div class="flex items-center gap-4 p-2">
                            <div class="p-2">
                                <p class="text-2xl font-bold">Total Score: <span class=" px-4 py-2 border border-slate-600">{scoring[index].total}</span> </p>  
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
                            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].equipment_inspection === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].equipment_inspection = false}>No</button>
                            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].equipment_inspection === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].equipment_inspection = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission01!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission01!.part1 = i}>{i}</button>
                                        {/each}
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Archaeologist{"’"}s brush is not touching the dig site
                    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission01!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission01!.part2 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission01!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission01!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission02!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission02!.part1 = i}>{i}</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission03!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => {scoring[index].mission03!.part1 = false; scoring[index].mission03!.part2 = false}}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission03!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission03!.part1 = true}>Yes</button>
                                    
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Bonus: and the opposing team’s minecart is on your team’s field    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""}  {scoring[index].mission03!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" disabled={!(isEditing && scoring[index].mission03!.part1)} on:click={() => scoring[index].mission03!.part2 = false}>No</button>
                                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""}  {scoring[index].mission03!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" disabled={!(isEditing && scoring[index].mission03!.part1)} on:click={() => scoring[index].mission03!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission04!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission04!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission04!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission04!.part1 = true}>Yes</button>
                                    
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Both support structures are standing    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission04!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission04!.part2 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission04!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission04!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission05!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission05!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission05!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission05!.part1 = true}>Yes</button>
                                    
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission06!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission06!.part1 = i}>{i}</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission07!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission07!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission07!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission07!.part1 = true}>Yes</button>
                                    
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission08!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission08!.part1 = i}>{i}</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission09!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission09!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission09!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission09!.part1 = true}>Yes</button>
                                    
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Market wares are raised    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission09!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission09!.part2 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission09!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission09!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission10!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission10!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission10!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission10!.part1 = true}>Yes</button>
                                    
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Scale pan is completely removed    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission10!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission10!.part2 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission10!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission10!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission11!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => {scoring[index].mission11!.part1 = false; scoring[index].mission11!.part2 = false} }>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission11!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission11!.part1 = true}>Yes</button>
                                    
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Bonus: and the crane flag is at least partly lowered    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission11!.part2 === false ? "bg-red-500 text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""} transition-colors" disabled={!(isEditing && scoring[index].mission11!.part1)} on:click={() => scoring[index].mission11!.part2 = false}>No</button>
                                        <button class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission11!.part2 === true ? "bg-green-500 text-white" : ""} {isEditing ? "disabled:bg-slate-900 disabled:text-slate-600" : ""} transition-colors" disabled={!(isEditing && scoring[index].mission11!.part1)} on:click={() => scoring[index].mission11!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission12!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission12!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission12!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission12!.part1 = true}>Yes</button>
                                    
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-3/4 p-2">
                                    <div>
                                        <p>Ship is completely raised    
                                        </p>
                                    </div>
                                    <div class="flex flex-row pt-4 justify-center items-center gap-2 w-fit ml-[4%]">
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission12!.part2 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission12!.part2 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission12!.part2 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission12!.part2 = true}>Yes</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].mission13!.part1 === false ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission13!.part1 = false}>No</button>
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission13!.part1 === true ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission13!.part1 = true}>Yes</button>
                                    
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission14!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission14!.part1 = i}>{i}</button>
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
                                        <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].mission15!.part1 === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].mission15!.part1 = i}>{i}</button>
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
                            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].precision_tokens === i ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].precision_tokens = i}>{i}</button>
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
                            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-red-500 hover:text-white" : ""} {scoring[index].gracious_professionalism === 2 ? "bg-red-500 text-white" : ""} transition-colors" on:click={() => scoring[index].gracious_professionalism = 2}>Developing</button>
                            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 hover:bg-orange-500 hover:text-white {scoring[index].gracious_professionalism === 3 ? "bg-orange-500 text-white" : ""} transition-colors" on:click={() => scoring[index].gracious_professionalism = 3}>Accomplished</button>
                            <button disabled={!isEditing} class="px-4 py-2 rounded-lg text-md font-semibold bg-gray-700 {isEditing ? "hover:bg-green-500 hover:text-white" : ""} {scoring[index].gracious_professionalism === 4 ? "bg-green-500 text-white" : ""} transition-colors" on:click={() => scoring[index].gracious_professionalism = 4}>Exceeds</button>
                        </div>
                    </div>
                </div>
            </li>
            {/each}


        </ul>
    {/if}

    


    
    

    

    
</div>  