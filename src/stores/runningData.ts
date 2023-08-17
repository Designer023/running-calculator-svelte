import { writable } from 'svelte/store'

export type Form =  {
    distance: number; // distance in metres
    time: number; // time in seconds
    distanceLocked: boolean;
}

const defaultData: Form = {
    distance: 10000,
    time: 3600,
    distanceLocked: true,
}

// Set the stored value or a sane default.
export const runningData = writable<Form>(defaultData)
