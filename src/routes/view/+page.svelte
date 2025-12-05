<script>
    export let data;
    console.log(data)
    
    let teamname = data.teamName;
    let teamnum = data.teamNum;
    let eventname = data.event;

    console.log(eventname);

    let team1 = eventname?.team_numbers
    for (const teams of team1){
        if (teamnum === teams){
            console.log(teams);
        }
    }
</script>
<div>
    <h2>
        Hello {teamname}!
    </h2>
    <p>
        Event Number: {eventname?.id}
    </p>

    
</div>