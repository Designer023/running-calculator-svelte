<script>
	export let value = 0;
	export let name = 'default';
	export let id;

	export let onInput = () => {}; // no-operation function
</script>

<input bind:value {name} type="number" on:input={onInput} {id} />
