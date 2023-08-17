<script>
	import { runningData } from '../../stores/runningData';
	import Input from '$lib/components/inputs/input.svelte';

	let distance = 0;
	let distanceLocked = true;

	runningData.subscribe((value) => {
		// convert time from seconds into hours, minutes and seconds
		distance = value.distance;
		distanceLocked = value.distanceLocked;
	});

	const updateValues = (event) => {
		const { name, value } = event.target;
		// depending on the updated field, update the time
		const parsed = Number(value);

		switch (name) {
			case 'distance':
				distance = parsed;
				break;
		}

		runningData.update((value) => {
			value.distance = distance;
			return value;
		});
	};

	const presetDistance = (e) => {
		distance = Number(e.target.value);
		runningData.update((value) => {
			value.distance = distance;
			return value;
		});
	};

	const presetOptions = [
		{ value: undefined, label: 'Select a preset' },
		{ value: 5000, label: '5km' },
		{ value: 10000, label: '10km' },
		{ value: 21097, label: 'Half marathon' },
		{ value: 42195, label: 'Marathon' },
		{ value: 50000, label: '50km' }
	];

	const toggleLocked = () => {
		runningData.update((value) => {
			value.distanceLocked = !value.distanceLocked;
			return value;
		});
	};
</script>

<div class="w-full flex flex-row flex-wrap justify-start items-end">
	<div class="w-1/2 md:w-48">
		<label for="presetOptions" class="block text-gray-700 text-sm font-bold mr-2">
			Preset distances

			<select
				on:change={presetDistance}
				id="presetOptions"
				disabled={distanceLocked}
				class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-500 aria-disabled:border-gray-200"
			>
				{#each presetOptions as option}
					<option disabled={!option.value} selected={distance === option.value} value={option.value}
						>{option.label}</option
					>
				{/each}
			</select>
		</label>
	</div>
	<div class="w-1/2 md:w-48">
		<Input
			disabled={distanceLocked}
			label="Distance M:"
			id="distance"
			name="distance"
			value={distance}
			onInput={updateValues}
		/>
	</div>

	<div class="ml-auto mt-3 md:mt-0">
		<button
			disabled={distanceLocked}
			aria-disabled={distanceLocked}
			class="w-32 bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded aria-disabled:bg-blue-100"
			on:click={toggleLocked}
		>
			Lock
		</button>
		<button
			disabled={!distanceLocked}
			aria-disabled={!distanceLocked}
			class="w-32 bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded aria-disabled:bg-blue-100"
			on:click={toggleLocked}
		>
			Unlock
		</button>
	</div>
</div>
