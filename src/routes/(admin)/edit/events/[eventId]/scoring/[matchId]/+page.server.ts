import { getEvent, getMatch } from '$lib/db'

export const load = async ({params}) => {
    const match = await getMatch(params.matchId as unknown as number)
    const event = await getEvent(params.eventId as unknown as number)
    if (match !== null) {
        return {match, event};
    } else {
        console.log("match not found")
        return { status: 404 }
    }
}