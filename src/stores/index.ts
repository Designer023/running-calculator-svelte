import { writable } from 'svelte/store'

export type Form =  {
    distance: number; // distance in metres
    time: number;
    pace: number;
    speed: number;
    chosenInput: "time" | "pace" | "speed";
}

// Get the value out of storage on load.
const stored = localStorage.content

// Set the stored value or a sane default.
export const content = writable<Form>(stored || { distance: 10000, chosenInput: "time", time: 3600, pace: 360, speed: 10 })

// Anytime the store changes, update the local storage value.
content.subscribe((value) => localStorage.content = value)
// or localStorage.setItem('content', value)