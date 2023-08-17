<script>
    import HMS from "$lib/components/HMS.svelte";
    import Distance from "$lib/components/Distance.svelte";
    import Pace from "$lib/components/Pace.svelte";
    import Speed from "$lib/components/Speed.svelte";
    import Toggle from "$lib/components/inputs/toggle.svelte";
</script>

<div class="container mx-auto">
    <h1 class="text-4xl mb-6 mt-2">Running pace calculator</h1>

    <form class="w-full ">
        <div class="md:flex md:items-center mb-6 flex-col">


            <Toggle />

            <Distance/>

            <HMS/>

            <Speed/>

            <Pace/>
        </div>
    </form>
</div>