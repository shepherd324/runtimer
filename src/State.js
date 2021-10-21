import { createState, useState } from '@hookstate/core';

const initialState = {
    races: [
        {
            id: 'race-dummy', name: "Dummy Race", start: 0
        }
    ],
    runners: [
        {
            id: 'runner-3', name: "Anya Schafer"
        },
        {
            id: 'runner-2', name: "Calla Schafer"
        },
        {
            id: 'runner-1', name: "Bryn Schafer"
        }
    ],
    laps: []
};
const state = createState(initialState)

export function useGlobalState() {
    // This function exposes the state directly.
    // i.e. the state is accessible directly outside of this module.     
    return useState(state)
}