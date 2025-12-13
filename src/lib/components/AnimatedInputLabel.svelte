<script lang="ts">
	export let type: 'text' | 'password' | 'number' = 'text';
	export let name = '';
	export let value = '';
	export let disabled = false;
	export let labelbg = 'bg-black';

	// make a safe id (spaces break label-for behavior)
	const id = name.replace(/\s+/g, '-').toLowerCase();
</script>

<div class="relative w-full">
	<input
		id={id}
		{type}
		{disabled}
		bind:value
		placeholder=" "
		class="
			peer
			w-full
			h-11
			bg-transparent
			border
			border-green-500/50
			rounded-xl
			pl-3
			pr-3
			text-green-300
			outline-none
			transition
			duration-200
			focus:border-green-400
			focus:shadow-[0_0_10px_rgba(34,197,94,0.4)]
		"
	/>

	<label
		for={id}
		class="
			absolute
			left-3
			top-1/2
			-translate-y-1/2
			px-1
			text-sm
			text-green-400/80
			cursor-text
			transition-all
			duration-200
			{labelbg}

			/* float when focused OR has content */
			peer-focus:-top-2
			peer-focus:text-xs
			peer-focus:text-green-300
			peer-focus:translate-y-0

			peer-not-placeholder-shown:-top-2
			peer-not-placeholder-shown:text-xs
			peer-not-placeholder-shown:text-green-300
			peer-not-placeholder-shown:translate-y-0
		"
	>
		{name}
	</label>
</div>
