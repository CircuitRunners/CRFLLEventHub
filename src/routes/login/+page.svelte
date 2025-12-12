<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import { goto } from '$app/navigation'

    import { getTeams } from '$lib/db';

    let teams = [];


    (async () => {
        let teams = await getTeams();
        console.log(teams);      
        let num = (teams[0].number);
        let numpass = (teams[0].password);
    })();

    let username: string
    let password: string

	import AnimatedInputLabel from '$lib/components/AnimatedInputLabel.svelte';
	import { enhance } from '$app/forms';

    let peek = false;
</script>

<div class="flex justify-center">
    <div class="flex flex-col w-1/2 relative justify-center">
        <AnimatedInputLabel
            name="Username"
            labelbg="bg-black"
            bind:value={username}
            size="scale-110"
        ></AnimatedInputLabel>
        <AnimatedInputLabel
            name="Password"
            type={peek ? 'text' : 'password'}
            labelbg="bg-black"
            bind:value={password}
            size="scale-110"
        ></AnimatedInputLabel>
        <button
            class="absolute right-[10%] top-[63%] cursor-pointer"
            on:click={() => {
                if (!peek) peek = true;
                else peek = false;
            }}
        >
            {#if !peek}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
            {/if}
        </button>
        <form use:enhance method="post">
            <input type="text" bind:value={username} class="hidden" name="username" />
            <input type="password" bind:value={password} class="hidden" name="password" />
            <button
                type="submit"
                on:click={() => {console.log("submitted")}}
                class="border bg-transparent w-[75%] cursor-pointer relative left-[12.5%] pl-4 pr-4 text-current rounded-md mt-[4%] scale-110 mt[6%]"
                >Log In</button
            >
        </form>
    </div>
</div>