<script>
    import { runningData } from "../../stores/runningData";
    import Input from "$lib/components/inputs/input.svelte";


    let data;
    let distance = 0;
    let distanceLocked = true;

    runningData.subscribe(value => {
        data = value;
        // convert time from seconds into hours, minutes and seconds
        distance = data.distance;
        distanceLocked = value.distanceLocked;
    })

    const updateValues = (event) => {
        const {name, value} = event.target;
        // depending on the updated field, update the time
        const parsed = Number(value);

        switch (name) {
            case "distance":
                distance = parsed;
                break;

        }

        data.distance = distance;
        runningData.set(data);
    }

    const presetDistance = (e) => {
        distance = Number(e.target.value);
        data.distance = distance;
        runningData.set(data);
    }

    const presetOptions = [
        {value: undefined, label: "Select a preset"},
        {value: 5000, label: "5km"},
        {value: 10000, label: "10km"},
        {value: 21097, label: "Half marathon"},
        {value: 42195, label: "Marathon"},
        {value: 50000, label: "50km"},
    ]
</script>


<div class="w-full">
    <h3 class="text-2xl mb-4 mt-1">Distance</h3>

    <div class="w-full md:flex flex-row  md:justify-start">
        <label for="presetOptions" class="block text-gray-700 text-sm font-bold mb-2 mr-2">
            Preset distances

            <select on:change={presetDistance} id="presetOptions" disabled={distanceLocked}
                    class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {#each presetOptions as option}
                    <option disabled={!option.value} selected={distance === option.value}
                            value={option.value}>{option.label}</option>
                {/each}
            </select>
        </label>

        <Input disabled={distanceLocked} label="Distance M:" id="distance" name="distance" value={distance} onInput={updateValues}/>
    </div>
</div>