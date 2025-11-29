<script lang="ts">
    export let text: string
    export let onClick: () => void
    export let classContent: string = ""
</script>

<button class="bg-slate-500 hover:bg-slate-700 cursor-pointer text-green-300 font-bold py-2 px-4 rounded w-fit {classContent}" on:click={onClick}>{text}</button>