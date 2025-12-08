import { getScore, getScores, getTeams } from "$lib/db";
import type { LayoutServerLoad } from "./$types";
import type { PageServerLoad } from "./$types";
import { getEvents } from "$lib/db";
import { getMatch } from "$lib/db";
import { getMatches } from "$lib/db";

export const load: PageServerLoad = async ({ cookies }) => {
    const teamNumber = cookies.get("team");
    
    if (!teamNumber) {
        return { teamName: null };
    }
    const teams = await getTeams();
    // console.log(teams);
    const team = teams.find(t => String(t.number) === teamNumber);
    // console.log(team)
    const events = await getEvents();
    // console.log(events);
    const matches = await getMatches();
    // console.log(matches);
    const scores = await getScores();
   

    

    return {
        
        teamName: team?.name ?? null,
        teamNum: team ? team.number : null,
        event: events ? events[0] : null,
        matches: matches ? matches : null,
        scores: scores ? scores : null
        
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

