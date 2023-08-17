<script>
    import { runningData } from "../../stores/runningData";
    import Input from "$lib/components/inputs/input.svelte";

    let data;
    let pacesecpermeter = 0;
    let pace = 0;
    let paceMinutes = 0;
    let paceSeconds = 0;

    runningData.subscribe(value => {
        data = value;
        // convert time from seconds into hours, minutes and seconds
        let {distance, time} = data;
        pacesecpermeter = time / distance;
        pace = pacesecpermeter * 1000;
        paceMinutes = Math.floor(pace / 60);
        paceSeconds = Math.floor(pace % 60);
        pacesecpermeter = Math.floor(pacesecpermeter * 1000) / 1000;

    })

    const updateValues = (event) => {

    }

</script>


<div class="w-full">
    <h3 class="text-2xl mb-1 mt-4">Pace</h3>
    <div class="w-full md:flex flex-row  md:justify-start">
        <div class="w-24">
            <Input label="sec/M" id="pace" name="pace" value={pacesecpermeter} onInput={updateValues}/>
        </div>
    </div>
    <div class="w-full md:flex flex-row  md:justify-start">
        <div class="w-24 pr-2">

            <Input label="MM" id="paceMinutes" name="paceMinutes" value={paceMinutes}
                   onInput={paceMinutes}/>
        </div>
        <div class="w-24 pr-2">
            <Input label="SS" id="paceSeconds" name="paceSeconds" value={paceSeconds}
                   onInput={paceSeconds}/>
        </div>
    </div>
</div>