<script>
	import { getMatch } from '$lib/db.js';
	import { onMount } from 'svelte';

    let {data} = $props()
    // console.log(data)
    
    let teamname = data.teamName;
    let teamnum = data.teamNum;
    let events = data.event;
    let match = data.matches;

    // console.log(match);
    // console.log(events);
    // console.log("Team Number: " + teamnum);
//ok so the above code is just like not even working like pu lling data wrong
    // console.log(match[0])
    console.log(teamnum);
    console.log(match);
    let teamGames = []; // [round number, table number, match id]
    let i = 0;
    if (match == null) {
        console.log("No matches found");
    }
    else{
        
        for (let m of match) {
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
    function scoreCalc(id, table) {
        onMount(async () => {
        
            let match = await getMatch(id);});
            let t = "table" + table;
            return match?.[t]?.score;
        
        
    }
    

    

</script>
<div>
    <h2>
        Hello {teamname}!
    </h2>
    <p>
        Event Number: {events?.id}
    </p>
    <h3>
        Your Matches:
    </h3>
    {#if teamGames.length == 0}
        <p>No matches found for this team.</p>
    {:else}
        <ul>
            {#each teamGames as game}
                <li>Round {game[0]} - Table {game[1]} (Match Score: {scoreCalc(game[0], game[1])})</li>
            {/each}
        </ul>
    {/if}

    
</div>