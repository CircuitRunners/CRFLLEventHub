<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/components/Button.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="bg-black text-green-300 h-screen w-screen">
	<nav class="flex justify-center mb-2 gap-4">
		<Button text="Home" onClick={() => window.location.href = '/'} />
		<Button text="Logout" onClick={() => window.location.href = '/logout'} />
	</nav>
		{@render children()}
</div>

