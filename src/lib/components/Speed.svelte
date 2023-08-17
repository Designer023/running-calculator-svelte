<script>
    import { runningData } from "../../stores/runningData";
    import Input from "$lib/components/inputs/input.svelte";

    let disabled;
    let speedKM;
    let speed;

    runningData.subscribe(value => {

        // convert time from seconds into hours, minutes and seconds
        let {distance, time, distanceLocked, timeLocked} = value;

        disabled = (!distanceLocked && !timeLocked) || (distanceLocked && timeLocked);

        // speed = distance / time;
        speed = distance / time;
        // https://en.run-motion.com/average-speed-calculator-pace/#:~:text=To%20calculate%20the%20speed%20in,and%201%20kilometre%20%3D%201000%20meters.
        // 3.6 because 1 hour = 3600 seconds and 1 kilometre = 1000 meters.
        speedKM = Math.round(speed * 3.6 * 100) / 100;
        speed = Math.ceil(speed * 10) / 10

    })

    const updateValues = (event) => {
        const {name, value} = event.target;
        // depending on the updated field, update the time
        const parsed = Number(value);

        switch (name) {
            case "speed":
                speed = parsed;
                break;
            case "speedKM":
                // convert to m/s
                speedKM = parsed
                speed = parsed / 3.6;
                break;
        }

        runningData.update(data => {
            if (data.distanceLocked) {
                // update time
                data.time = Math.round(data.distance / speed); // round to the nearest second
            } else if (data.timeLocked) {
                // update distance
                data.distance = Math.round(speed * data.time); // round to the nearest meter
            }
            return data;
        })

    }

</script>


<div class="w-full md:flex flex-row  md:justify-start">
    <div class="w-24 pr-2">
        <Input disabled={disabled} label="M/S" id="speed" name="speed" value={speed} onInput={updateValues}/>
    </div>
    <div class="w-24 pr-2">
        <Input disabled={disabled} label="KM/H" id="speedKM" name="speedKM" value={speedKM} onInput={updateValues}/>
    </div>
</div>
