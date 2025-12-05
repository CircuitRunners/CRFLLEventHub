import { getTeams } from "$lib/db";
import type { LayoutServerLoad } from "./$types";
import { getEvents } from "$lib/db";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const teamNumber = cookies.get("team");
    
    if (!teamNumber) {
        return { teamName: null };
    }
    const teams = await getTeams();

    const team = teams.find(t => String(t.number) === teamNumber);

    const events = await getEvents();

    

    return {
        
        teamName: team?.name ?? null,
        teamNum: team ? team.number : null,
        event: events ? events[0] : null
        
    };
};



