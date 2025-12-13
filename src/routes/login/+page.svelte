<script lang="ts">
	import AnimatedInputLabel from '$lib/components/AnimatedInputLabel.svelte';
	import { enhance } from '$app/forms';

	let username = '';
	let password = '';
	let peek = false;
</script>

<div class="min-h-[80vh] flex items-center justify-center px-4">
	<div
		class="
			w-full
			max-w-sm
			bg-black
			border
			border-green-500/40
			rounded-2xl
			p-6
			flex
			flex-col
			gap-6
			shadow-[0_0_25px_rgba(34,197,94,0.15)]
		"
	>
		<h1 class="text-center text-2xl font-bold text-green-300">
			Team Login
		</h1>

		<!-- Team Number -->
		<AnimatedInputLabel
			name="Team Number"
			type="text"
			bind:value={username}
		/>

		<!-- Password -->
		<div class="relative">
			<AnimatedInputLabel
				name="Password"
				type={peek ? 'text' : 'password'}
				bind:value={password}
			/>

			<button
				type="button"
				class="
					absolute
					right-3
					top-1/2
					-translate-y-1/2
					text-green-400
					hover:text-green-300
					transition
				"
				on:click={() => (peek = !peek)}
				aria-label="Toggle password visibility"
			>
				{#if peek}
					<!-- eye -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none"
						viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-5 h-5">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
					</svg>
				{:else}
					<!-- eye-off -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none"
						viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-5 h-5">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21" />
					</svg>
				{/if}
			</button>
		</div>

		<!-- Login form -->
		<form use:enhance method="post">
			<input type="text" name="username" bind:value={username} class="hidden" />
			<input type="password" name="password" bind:value={password} class="hidden" />

			<button
				type="submit"
				class="
					w-full
					mt-4
					py-2.5
					rounded-xl
					font-bold
					text-black
					bg-green-400
					hover:bg-green-300
					active:scale-[0.98]
					transition
					shadow-[0_0_15px_rgba(34,197,94,0.5)]
				"
			>
				Log In
			</button>
		</form>
	</div>
</div>
