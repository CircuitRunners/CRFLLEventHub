import { getScore, getScores, getTeams } from "$lib/db";
import type { PageServerLoad } from "./$types";
import { getEvents } from "$lib/db";
import { getMatch } from "$lib/db";
import { getMatches } from "$lib/db";
import { redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ cookies }) => {
    if(!cookies.get('team')) {
        redirect(303, '/login');
    }

    const teamNumber = cookies.get("team");
    
    if (!teamNumber) {
        return { teamName: null };
    }
    const teams = await getTeams();
    console.log(teams);
    const team = teams!.find(t => String(t.number) === teamNumber);
    console.log(team)
    const live_event = (await getEvents())?.filter((e: any) => e.live)[0] as any;
    // console.log(live_event);
    let matches = []
    for(let match_id of live_event.schedule.matches) {
        let match = (await getMatch(match_id))![0];
        // console.log(match)
        matches.push(match)
    }
    // console.log(matches);
    const scores = await getScores();

    if (teamNumber === "-1") {
        return {
            teamName: "Admin",
            teamNum: -1,
            live_event: live_event ? live_event : null,
            matches: matches ? matches : null,
            scores: scores ? scores : null
        };
    }

    return {
        
        teamName: team?.name ?? null,
        teamNum: team ? team.number : null,
        live_event: live_event ? live_event : null,
        matches: matches ? matches : null,
        scores: scores ? scores : null
        
    };
};
