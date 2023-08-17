<script>
    import { runningData } from "../../stores/runningData";
    import Input from "$lib/components/inputs/input.svelte";
    import {hhmmssToSec} from "$lib/calculations/conversions/hhmmssToSec";


    let data;

    let timeHours = 0;
    let timeMinutes = 0;
    let timeSeconds = 0;
    let locked = false;

    runningData.subscribe(value => {
        data = value;
        // convert time from seconds into hours, minutes and seconds
        timeHours = Math.floor(data.time / 3600);
        timeMinutes = Math.floor((data.time - (timeHours * 3600)) / 60);
        timeSeconds = data.time - (timeHours * 3600) - (timeMinutes * 60);
        locked = data.timeLocked;
    })

    const updateValues = (event) => {
        const {name, value} = event.target;
        // depending on the updated field, update the time
        const parsed = Number(value);
        switch (name) {
            case "timeHours":
                timeHours = parsed;
                break;
            case "timeMinutes":
                timeMinutes = parsed;
                break;
            case "timeSeconds":
                timeSeconds = parsed;
                break;
        }
        // convert time back into seconds
        data.time = hhmmssToSec(timeHours, timeMinutes, timeSeconds);
        runningData.set(data);
    }

    const toggleLocked = () => {
        runningData.update(value => {
            value.timeLocked = !value.timeLocked;
            return value;
        })
    }
</script>



<div class="w-full flex flex-row flex-wrap  justify-start items-end">
    <div class="w-1/3 md:w-24 pr-2">
        <Input disabled={locked} label="HH:" id="timeHours" name="timeHours" value={timeHours} onInput={updateValues}/>
    </div>
    <div class="w-1/3 md:w-24  pr-2">
        <Input disabled={locked} label="MM:" id="timeMinutes" name="timeMinutes" value={timeMinutes}
               onInput={updateValues}/>
    </div>
    <div class="w-1/3 md:w-24 ">
        <Input disabled={locked} label="SS:" id="timeSeconds" name="timeSeconds" value={timeSeconds}
               onInput={updateValues}/>
    </div>

    <div class="ml-auto mt-3 md:mt-0">
        <button  disabled={locked} aria-disabled={locked} class="w-32 bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded aria-disabled:bg-blue-100" on:click={toggleLocked}>
            Lock
        </button>
        <button  disabled={!locked} aria-disabled={!locked} class="w-32 bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded aria-disabled:bg-blue-100" on:click={toggleLocked}>
            Unlock
        </button>
    </div>
</div>
