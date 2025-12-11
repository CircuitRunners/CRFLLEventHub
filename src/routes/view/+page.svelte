<script lang='ts'>
	import { getMatch } from '$lib/db.js';
	import { onMount } from 'svelte';

    let {data} = $props()
    // console.log(data)
    
    let teamname = data.teamName;
    let teamnum = data.teamNum;
    let event = data.live_event;
    let matches = data.matches;
    console.log(matches)
    let allScores = data.scores
    console.log(allScores)

    // console.log(match);
    // console.log(events);
    // console.log("Team Number: " + teamnum);
//ok so the above code is just like not even working like pu lling data wrong

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
                         scoring.push(score.total);
                    }
                }
            }
            
        }
        return scoring;
    }

    let scoring = findScore(matchIds, tableIds);



    

    

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

    {#if scoring.length > 0}
        <h3>Your Scores:</h3>
        <ul>
            {#each scoring as score, index}
                <li>Match {index + 1}: {score}</li>
            {/each}
        </ul>
    {/if}


    
    

    

    
</div>  