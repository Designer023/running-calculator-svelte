<script>
    import { runningData } from "../../stores/runningData";
    import Input from "$lib/components/inputs/input.svelte";

    let data;
    let speedKM;
    let speed;

    runningData.subscribe(value => {
        data = value;
        // convert time from seconds into hours, minutes and seconds
        let {distance, time} = data;

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

        data.distance = Math.round(speed * data.time); // round to the nearest meter
        runningData.set(data);
    }

</script>


<div class="w-full">
    <h3 class="text-2xl mb-1 mt-4">Speed</h3>
    <div class="w-full md:flex flex-row  md:justify-start">
        <div class="w-24 pr-2">
            <Input label="M/S" id="speed" name="speed" value={speed} onInput={updateValues}/>
        </div>
        <div class="w-24 pr-2">
            <Input label="KM/H" id="speedKM" name="speedKM" value={speedKM} onInput={updateValues}/>
        </div>
    </div>
</div>