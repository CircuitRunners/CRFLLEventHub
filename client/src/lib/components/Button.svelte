<script lang="ts">
    export let text: string
    export let onClick: () => void
</script>

<button class="bg-slate-500 hover:bg-slate-700 text-green-300 font-bold py-2 px-4 rounded w-fit" on:click={onClick}>{text}</button>