<script>
    export let value = 0;
    export let name = "default";
    export let id;
    export let type = "text"
    export let label;
    export let disabled = false;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    export let onInput = () => {
    } // no-operation function
</script>

<label for={id} class="block text-gray-700 text-sm font-bold">{label}
    <input disabled={disabled} aria-disabled={disabled} bind:value name={name} type="number" on:input={onInput} id={id}
           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-500 aria-disabled:border-gray-200"/>
</label>