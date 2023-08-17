<script>
    import {runningData} from "../../stores/runningData";

    export let text = "This is a warning message";

    let disabled;

    runningData.subscribe(value => {
        const { distanceLocked, timeLocked } = value;
        disabled = (!distanceLocked && !timeLocked) || (distanceLocked && timeLocked);
    })

</script>

{#if disabled }
<div class="w-full flex items-center bg-yellow-100 text-gray-900 text-sm font-bold px-4 py-3 rounded border-solid border border-amber-300" role="alert">
    <span class="mr-2">👋️</span>
    <p>{text}</p>
</div>
{/if}