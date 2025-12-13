<script lang="ts">
    import ScoreBreakdown from '$lib/components/ScoreBreakdown.svelte';
    import { blankScore } from '$lib';
    import Button from '$lib/components/Button.svelte';

    // Import applyAction from SvelteKit for better UX on form submission
    import { applyAction } from '$app/forms';

    let { data } = $props();

    let teamname = data.teamName;
    let teamnum = data.teamNum;
    let event = data.live_event;
    let matches = data.matches;
    let allScores = data.scores;
    let admin = data.admin;

    let teamGames = [];
    let i = 0;

    if (matches) {
        for (let m of matches as any[]) {
            i += 1;
            for (let t = 1; t <= 6; t++) {
                if (m[`table${t}`]?.team === teamnum) {
                    teamGames.push([i, t, m.id]);
                }
            }
        }
    }

    function getTeamScores(teamGames: any[], allScores: any[]) {
        return teamGames.map(([round, table, matchId]) => {
            const score = allScores.find(
                (s) => s.table === table && s.match_id === matchId
            );
            return { round, table, matchId, score: score ?? null };
        });
    }

    const teamScores = getTeamScores(teamGames, allScores ?? []);

    let selectedScore = $state(blankScore);
    let scoreBreakdownDisplay = $state(false);
    let teamSelectPopup = $state(false);
    let teamNumbers = event.team_numbers;
    
    // Function to handle the form submission and close the modal
    // Note: Since this form submission will reload the page with new data,
    // the modal state will reset. This is included just for a clean closure.
    // If you used use:enhance, this function would be more necessary.
    const handleFormSubmit = () => {
        teamSelectPopup = false;
        // The form action will handle the navigation/data reload
    }
</script>

<div class="min-h-screen bg-black text-green-300 px-4 sm:px-8 lg:px-[12%] py-8">

    <div class="w-full max-w-4xl mx-auto bg-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 class="text-3xl font-bold text-center">
            Hello {teamname}
        </h1>

        <p class="text-center text-lg mt-2 opacity-80">
            Team {teamnum}
        </p>

        <p class="text-center text-sm mt-4">
            Event {event.season} · {event.type}
            {#if admin}
                <span class="block text-green-400 font-semibold mt-1">
                    Admin View Mode
                </span>
            {/if}
        </p>

        {#if admin}
            <div class="flex justify-center mt-4">
                <Button
                    text="Select Team"
                    onClick={() => (teamSelectPopup = true)}
                />
            </div>
        {/if}
    </div>

    <div class="max-w-4xl mx-auto mt-10">
        <h2 class="text-xl font-bold mb-4 text-center">
            Your Matches
        </h2>

        {#if teamScores.length === 0}
            <p class="text-center opacity-70">
                No matches found.
            </p>
        {:else}
            <div class="grid gap-4  sm:grid-cols-2">
                {#each teamScores as teamScore, i}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="
                            bg-slate-700
                            rounded-xl
                            p-4
                            cursor-pointer
                            transition
                            hover:bg-slate-600
                            hover:scale-[1.01]
                        "
                        onclick={() => {
                            selectedScore = teamScore.score || blankScore;
                            scoreBreakdownDisplay = true;
                        }}
                    >
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-semibold">
                                    Round {teamScore.round}
                                </p>
                                <p class="text-sm opacity-80">
                                    Table {teamScore.table}
                                </p>
                            </div>

                            <div class="text-right">
                                <p class="text-xs opacity-70">Score</p>
                                <p class="text-xl font-bold">
                                    {teamScore.score?.total ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    {#if scoreBreakdownDisplay}
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex overflow-auto justify-center px-4 py-8">
            
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <div class="relative max-w-7xl w-full bg-slate-900 rounded-2xl p-6 max-h-[90vh] overflow-y-auto my-auto">
                
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    class="absolute top-4 right-4 text-green-300 hover:text-red-400 z-50"
                    onclick={() => (scoreBreakdownDisplay = false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <ScoreBreakdown
                    score={selectedScore}
                    isEditing={false}
                    match={null}
                    team={null}
                />
            </div>
        </div>
    {/if}

    {#if teamSelectPopup}
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex overflow-auto justify-center px-4 py-8">
            <div class="relative max-w-xl w-full bg-slate-900 rounded-2xl p-6 max-h-[90vh] overflow-y-auto my-auto">
                
                <h2 class="text-2xl font-bold text-center mb-6 text-green-300">
                    Select Team to View
                </h2>

                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    class="absolute top-4 right-4 text-green-300 hover:text-red-400 z-50"
                    onclick={() => (teamSelectPopup = false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="grid grid-cols-5 sm:grid-cols-6 gap-3">
                        {#each teamNumbers as team}
                            <form action="/view" method="POST">
                                <input type="hidden" name="team" value={team}>
                                <button
                                    type="submit"
                                    class="
                                        w-full p-3 rounded-xl text-lg font-semibold transition-colors
                                        border-2
                                        {team === teamnum 
                                            ? 'bg-green-600 text-white border-green-600 shadow-xl' 
                                            : 'bg-slate-700 text-green-300 border-slate-700 hover:bg-slate-600 hover:border-green-500'}
                                    "
                                >
                                    {team}
                                </button>
                            </form>
                        {/each}
                </div>
                
            </div>
        </div>
    {/if}
</div>