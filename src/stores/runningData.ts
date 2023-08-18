import { writable } from 'svelte/store';

export type Form = {
	distance: number; // distance in metres
	time: number; // time in seconds
	distanceLocked: boolean;
	timeLocked: boolean;
};

const defaultData: Form = {
	distance: 10000,
	time: 3600,
	distanceLocked: false,
	timeLocked: false
};

// Set the stored value or a sane default.
export const runningData = writable<Form>(defaultData);

// Create helper functions to update the store.

export const updateDistance = (distance: number) => {
	runningData.update((data) => ({ ...data, distance }));
};

export const updateTime = (time: number) => {
	runningData.update((data) => ({ ...data, time }));
};

export const toggleDistanceLock = () => {
	runningData.update((data) => ({ ...data, distanceLocked: !data.distanceLocked }));
};

export const toggleTimeLock = () => {
	runningData.update((data) => ({ ...data, timeLocked: !data.timeLocked }));
};
