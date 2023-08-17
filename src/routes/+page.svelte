<script>
    import HMS from "$lib/components/HMS.svelte";
    import Distance from "$lib/components/Distance.svelte";
    import Pace from "$lib/components/Pace.svelte";
    import Speed from "$lib/components/Speed.svelte";
    import Panel from "$lib/components/Panel.svelte";
    import Warning from "$lib/components/Warning.svelte";
</script>

<div class="container mx-auto">
    <h1 class="text-4xl mb-6 mt-2">Running pace calculator</h1>

    <form class="w-full ">
        <div class="md:flex md:items-center mb-6 flex-col">

            <Panel>
                <span slot="title">Distance</span>
                <div slot="content">
                    <Distance/>
                </div>
            </Panel>

            <Panel>
                <span slot="title">Time</span>
                <div slot="content">
                    <HMS/>
                </div>
            </Panel>

            <Warning text="Either distance or time must be locked to edit pace or speed." />

            <Panel>
                <span slot="title">Speed</span>
                <div slot="content">
                    <Speed/>
                </div>
            </Panel>

            <Panel>
                <span slot="title">Pace</span>
                <div slot="content">
                    <Pace/>
                </div>
            </Panel>

        </div>
    </form>
</div>