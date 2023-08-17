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
        locked = !data.distanceLocked;
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
</script>


<div class="w-full">
    <h3 class="text-2xl mb-4 mt-1">Time</h3>
    <article class="prose lg:prose-xl">
        Time waits for no man (or woman). The same is true for your running pace.
    </article>
    <div class="w-full md:flex flex-row  md:justify-start">
        <div class="w-24">
            <Input disabled={locked} label="HH:" id="timeHours" name="timeHours" value={timeHours} onInput={updateValues}/>
        </div>
        <div class="w-24">
            <Input disabled={locked} label="MM:" id="timeMinutes" name="timeMinutes" value={timeMinutes}
                   onInput={updateValues}/>
        </div>
        <div class="w-24">
            <Input disabled={locked} label="SS:" id="timeSeconds" name="timeSeconds" value={timeSeconds}
                   onInput={updateValues}/>
        </div>
    </div>
</div>