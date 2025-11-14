<script lang='ts'>
	import AnimatedInputLabel from "./AnimatedInputLabel.svelte";

    export let event;
</script>

<div class="border rounded-lg p-4 w-3/4 bg-slate-800">
    <AnimatedInputLabel name="Season" labelbg="bg-slate-800" width='w-1/2' mt='mt-[2%]' value={event.season} size=""></AnimatedInputLabel>
    <AnimatedInputLabel name="Type" labelbg="bg-slate-800" width='w-1/2' mt='mt-[2%]' value={event.type} size=""></AnimatedInputLabel>
</div>