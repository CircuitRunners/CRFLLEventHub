<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/components/Button.svelte';

	let { children, data } = $props();
	let team = data.team;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="bg-black text-green-300 h-screen w-screen overflow-auto">
	<nav class="flex justify-center mb-2 gap-4">
		<Button text="View" onClick={() => window.location.href = '/view'} />
		{#if data.admin}
			<Button text="Edit" onClick={() => window.location.href = '/edit/events'} />
		{/if}
		{#if team} 
			<Button text="Log out" onClick={() => window.location.href = '/logout'} />
		{:else}
			<Button text="Log in" onClick={() => window.location.href = '/login'} /> 
		{/if}
	</nav>
		{@render children()}
</div>

