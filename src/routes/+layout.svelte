<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	let { children, data } = $props();
	let team = data.team;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-black text-green-300 min-h-screen w-full overflow-x-hidden">
	<!-- Top bar -->
	<header class="relative w-full">
		<!-- Watch live button -->
		<div class="hidden md:block absolute top-2 right-4 z-20">
			<Button
				text="Watch Live"
				onClick={() => window.location.href = 'https://live.circuitrunners.org'}
			/>
		</div>

		<!-- Navigation -->
		<nav
			class="
				flex
				flex-wrap
				justify-center
				gap-2
				sm:gap-4
				px-2
				sm:px-6
				mt-12
				sm:mt-4
			"
		>
			<Button text="View" onClick={() => goto('/view')} />
			<Button text="Rankings" onClick={() => goto('/rankings')} />

			{#if data.admin === 'true'}
				<Button text="Edit" onClick={() => goto('/edit/events')} />
			{/if}

			{#if team}
				<Button
					text="Log out"
					onClick={() => {
						team = undefined;
						goto('/logout');
					}}
				/>
			{:else}
				<Button
					text="Log in"
					onClick={() => {
						team = '';
						goto('/login');
					}}
				/>
			{/if}
		</nav>
	</header>

	<!-- Page content -->
	<main class="w-full px-2 sm:px-6 py-4">
		{@render children()}
	</main>
</div>
