<script>
    import {runningData} from "../../../stores/runningData";

    let distanceLocked = true;
    let data;

    runningData.subscribe(
        (value) => {
            data = value;
            distanceLocked = value.distanceLocked;
        }
    );

    const setToggle = (event) => {
        runningData.set({...data, distanceLocked: event.target.checked})
    }
</script>

<label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" class="sr-only peer" on:change={setToggle} checked={distanceLocked}>
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Distance</span>
</label>
