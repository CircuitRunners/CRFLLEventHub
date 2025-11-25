<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { getEvents, createEvent, updateEvent, deleteEvent } from "$lib/db";
	import Button from "$lib/components/Button.svelte";

    let newEventDisplay = false;
    let newEvent = {
        season: "",
        type: "",
        schedule: {},
        team_numbers: [],
        rankings: [],
    };
    let events: any[] = [newEvent];

    // Load events on mount
    onMount(async () => {
        events = await getEvents() || [];
    });
    const addNewEvent = async () => {
        createEvent(newEvent);
        events = [...events, newEvent];
        newEventDisplay = false;
        newEvent = {
            season: "",
            type: "",
            schedule: {},
            team_numbers: [],
            rankings: [],
        };
    }
</script>

<div class="flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold">Events</h1>
    <div class="flex flex-col justify-center items-center w-1/2 gap-4 mt-4">
        {#if events}
            {#each events as event}
                <EventCard event={event} closeEventPopup={async() => {
                    events = events.filter((old_event: any) => old_event.id !== event.id);
                    console.log(events)
                    await deleteEvent(event.id)
                }} />
            {/each}
        {:else}
            <p>No events found</p>
        {/if}
        <Button text="Create Event" onClick={() => newEventDisplay = true} />
        {#if newEventDisplay}
            <h1 class="text-2xl font-bold">Create Event</h1>
            <EventCard event={newEvent} closeEventPopup={async() => {newEventDisplay = false}} createEvent={addNewEvent} type="create"></EventCard>
        {/if}
    </div>
</div>