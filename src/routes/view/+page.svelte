<script lang='ts'>
	import ScoreBreakdown from '$lib/components/ScoreBreakdown.svelte';
	import { blankScore, type Score } from '$lib';
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

    let teamGames = []; // [round number, table number, match id]
    let i = 0;
    if (matches == null) {
        console.log("No matches found");
    }
    else{
        
        for (let m of (matches as any))  {
            i += 1;
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

    
    function getTeamScores(teamGames: any[], allScores: any[]) {
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

    
    const teamScores = getTeamScores(teamGames, allScores!);
    console.log(teamScores);
    const onlyTotals = teamScores.map((x) => {
        if (x.score) {
            return x.score.total;
        } else {
            return 0
        }
    });

    let matchIds = teamGames.map((x) => x[2]);
    let tableIds = teamGames.map((x) => x[1]);
    // console.log("Match Ids:");
    // console.log(matchIds);
    // let scoresForTeamMatches = allScores!.filter((score) => matchIds.includes(score.match_id) && tableIds.includes(score.table));
    // console.log("Scores for Team Matches:");
    // console.log(scoresForTeamMatches);
    // console.log("Table Ids:");
    // console.log(tableIds);
    let selectedScore = $state(blankScore)
    let scoreBreakdownDisplay = $state(false)
</script>
<div class="w-full px-[10%] flex flex-col items-center h-fit overflow-visible relative bg-black">
    <div class="w-full h-fit flex flex-col items-center {scoreBreakdownDisplay ? "blur-md" : "blur-0"}">
        <h2 class="text-center text-3xl font-bold">
            Hello {teamname}!
        </h2>
        <p class="text-center text-2xl font-bold mt-4">
            Event {event.season} | {event.type}
        </p>
        <h3 class="text-center text-xl font-bold mt-4">
            Your Matches:
        </h3>
        {#if teamGames.length == 0}
            <p>No matches found for this team.</p>
        {:else}
            <ul class="mt-4">
                {#each teamScores as teamScore}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <li class=" bg-slate-700 rounded-lg border p-4 cursor-pointer hover:bg-slate-500 hover:text-bold" onclick={() => {selectedScore = teamScore.score; scoreBreakdownDisplay=true}}>Round {teamScore.round} - Table {teamScore.table} (Score: {teamScore.score?.total || 0})</li>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="{scoreBreakdownDisplay ? "" : "hidden"} w-[100%] absolute top-0 rounded-2xl h-fit bg-blur"> 
        <ScoreBreakdown score={selectedScore} isEditing={false} match={null} ></ScoreBreakdown>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="fixed top-[10%] right-[10%] z-10 cursor-pointer bg-transparent hover:text-red-600 stroke-green-200" onclick={() => scoreBreakdownDisplay = false}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</div>  