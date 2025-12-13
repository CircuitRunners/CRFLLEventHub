import { getScore, getScores, getTeams } from "$lib/db";
import type { PageServerLoad } from "./$types";
import { getEvents } from "$lib/db";
import { getMatch } from "$lib/db";
import { getMatches } from "$lib/db";
import { redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ cookies }) => {
    if(!cookies.get('team')) {
        redirect(303, '/rankings');
    }

    const teamNumber = cookies.get("team");
    const admin = cookies.get("admin");
    
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
        console.log("admin")
        return {
            teamName: "Admin",
            teamNum: teamNumber,
            live_event: live_event ? live_event : null,
            matches: matches ? matches : null,
            scores: scores ? scores : null,
            admin: admin === "true" ? true : false
        };
    }

    return {
        teamName: team?.name ?? null,
        teamNum: team ? team.number : null,
        live_event: live_event ? live_event : null,
        matches: matches ? matches : null,
        scores: scores ? scores : null,
        admin: admin === "true" ? true : false
        
    };
};

// export const getMatches = async () => {
//     const { data, error } = await supabase.from('Match').select('*')
//     if (error) {
//         console.log(error)
//         return null
//     }
//     return data
// }
// export const getMatch = async (id: number) => {
//     const { data, error } = await supabase.from('Match').select('*').eq('id', id)
//     if (error) {
//         console.log(error)
//         return null
//     }
//     return data
// }

export const actions = {
    default: async (event) => {
        console.log("team select")
        let formData = Object.fromEntries(await event.request.formData());
        console.log(formData)
        let teamNum = formData.team as string;
        event.cookies.set('team', teamNum, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            expires: new Date(8.64e15)
        });
        redirect(303, '/view');
    }
}