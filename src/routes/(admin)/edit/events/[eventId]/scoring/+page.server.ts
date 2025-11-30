import { getEvent } from '$lib/db'

export const load = async ({params}) => {
    const event = await getEvent(params.eventId as unknown as number)
    if (event !== null) {
        return {event};
    } else {
        console.log("Event not found")
        return { status: 404 }
    }
}