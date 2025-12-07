<script lang="ts">
	import { createScore, getScore, updateMatch, updateScore } from '$lib/db.ts';
    import type { Score } from '$lib/index';
    import { blankScore } from '$lib/index';
	import ScoreBreakdown from '$lib/components/ScoreBreakdown.svelte';
	import { onMount } from 'svelte';

    

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

    const saveScore = async (score: Score) => {
        console.log(score)
        if(score.id) {
            await updateScore(score);
        } else {
            console.log(score)
            let data = await createScore(score);
            console.log(data)
            score = data as unknown as Score;
            console.log(score)
            table.score = score.id;
            console.log(table)
            console.log(match)
            await updateMatch(match);
        }
    }
</script>
<div class="w-full h-full pb-[5%]">
    <ScoreBreakdown {score} {saveScore} />
</div>