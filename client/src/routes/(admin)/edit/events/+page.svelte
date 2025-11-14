<script lang="ts">
    import { onMount } from "svelte";
    import EventCard from "$lib/components/EventCard.svelte";
    import { getEvents, createEvent, updateEvent } from "$lib/db";
	import Button from "$lib/components/Button.svelte";

    let events: any[] | null = [];

    // Load events on mount
    onMount(async () => {
        events = await getEvents();
    });
    let newEventDisplay = false;
    let newEvent = {
        season: "",
        type: "",
        schedule_id: 0,
        team_ids: [],
        rankings_ids: [],
    };
</script>

<div class="flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold">Events</h1>
    <div class="flex flex-col justify-center items-center w-1/2 gap-4 mt-4">
        {#if events}
            {#each events as event}
                <EventCard event={event} />
            {/each}
        {:else}
            <p>No events found</p>
        {/if}
        <Button text="Create Event" onClick={() => newEventDisplay = true} />
        {#if newEventDisplay}
            <h1 class="text-2xl font-bold">Create Event</h1>
            <EventCard event={newEvent}></EventCard>
        {/if}
    </div>
</div>