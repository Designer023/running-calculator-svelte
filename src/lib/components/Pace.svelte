<script>
    import { runningData } from "../../stores/runningData";
    import Input from "$lib/components/inputs/input.svelte";


    let pacesecpermeter = 0;
    let pace = 0;
    let paceMinutes = 0;
    let paceSeconds = 0;
    let disabled = false;

    runningData.subscribe(value => {

        // convert time from seconds into hours, minutes and seconds
        let {distance, time, distanceLocked, timeLocked} = value;

        disabled = (!distanceLocked && !timeLocked) || (distanceLocked && timeLocked);

        pacesecpermeter = time / distance;  // pace s / m = time s / distance m
        pace = pacesecpermeter * 1000; // s / km
        paceMinutes = Math.floor(pace / 60);
        paceSeconds = Math.floor(pace % 60);
        pacesecpermeter = Math.floor(pacesecpermeter * 1000) / 1000; // round it a bit

    })

    const updateValues = (event) => {
        const {name, value} = event.target;
        // depending on the updated field, update the time
        const parsed = Number(value);

        switch (name) {
            case "pacesecpermeter":
                pacesecpermeter = parsed;
                break;
            case "paceMinutes":
                paceMinutes = parsed; // minutes per 1000m
                pacesecpermeter = ((paceMinutes * 60) + paceSeconds) / 1000;
                break;
            case "paceSeconds":
                paceSeconds = parsed; // seconds per 1000m
                pacesecpermeter = ((paceMinutes * 60) + paceSeconds) / 1000
                break;
        }

        const speed = 1 / pacesecpermeter;

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
    <div class="w-24">
        <Input disabled={disabled} label="sec/M" id="pace" name="pacesecpermeter" value={pacesecpermeter} onInput={updateValues}/>
    </div>
</div>

<div class="w-full md:flex flex-row  md:justify-start">
    <div class="w-24 pr-2">

        <Input disabled={disabled} label="MM" id="paceMinutes" name="paceMinutes" value={paceMinutes}
               onInput={updateValues}/>
    </div>
    <div class="w-24 pr-2">
        <Input disabled={disabled} label="SS" id="paceSeconds" name="paceSeconds" value={paceSeconds}
               onInput={updateValues}/>
    </div>
</div>
