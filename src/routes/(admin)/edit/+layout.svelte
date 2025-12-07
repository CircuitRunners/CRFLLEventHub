<script>
	import '../../../app.css';
	import Button from "$lib/components/Button.svelte";
	let { children } = $props();

</script>
<div class="bg-black text-green-300 w-screen ">
    <nav class="mb-2 flex justify-center gap-4">
        <Button text="Events" onClick={() => window.location.href = '/edit/events'} />
        <Button text="Teams" onClick={() => window.location.href = '/edit/teams'} />
        
    </nav>
    {@render children()}
</div>