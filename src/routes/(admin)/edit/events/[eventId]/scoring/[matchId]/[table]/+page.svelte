<script lang="ts">
	import { createScore, getScore, updateMatch, updateScore } from '$lib/db.ts';
    import type { Score } from '$lib/index';
    import { blankScore } from '$lib/index';
	import ScoreBreakdown from '$lib/components/ScoreBreakdown.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

    

    let {data} = $props()
    let event: any = data.event![0]
    let match: any = data.match![0]
    let table = match[`${data.table}`]
    console.log(table)
    let score: any = $state(blankScore)
    score.match_id = match.id;
    score.table = parseInt(data.table?.toString().substring(5) || "0");

    onMount(async () => {
        if (table.score && table.score !== -1) {
            let data = await getScore(table.score);
            score = data![0] as unknown as Score;
            console.log(score)
        }
    })

</script>
<div class="w-full h-full pb-[5%]">
    <ScoreBreakdown {score} {match} isEditing={true}/>
    <div class=" flex justify-center mt-4">
        <Button text="Back to Table Selection" onClick={() => goto(`/edit/events/${event.id}/scoring/${match.id}`)}></Button>
    </div>
</div>