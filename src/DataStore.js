import store from 'store'

export function persistRaces(races) {
    let initialState = store.get('initialState')
    initialState.races = races
    store.set('initialState', initialState)
}

export function persistRace(race) {
    let initialState = store.get('initialState')
    let ix = initialState.races.findIndex(x => x.id === race.id)
    if (ix !== -1) {
        initialState.races[ix] = race
        store.set('initialState', initialState)
    }
    
}

export function persistRunners(runners) {
    let initialState = store.get('initialState')
    initialState.runners = runners
    store.set('initialState', initialState)
}

export function persistLaps(laps) {
    let initialState = store.get('initialState')
    initialState.laps = laps
    store.set('initialState', initialState)
}

export function updateRaceLaps(laps) {
    let state = store.get('initialState')
    const newLaps = state.laps.concat(laps)
    state.laps = newLaps
    store.set('initialState', state)
}

export function getRunners() {
    return store.get('initialState').runners
}

export function getRaces() {
    return store.get('initialState').races
}

export function getRace(id) {
    let races = store.get('initialState').races.filter(x => x.id === id)
    return races[0]
}

export function getLaps(raceId, runnerId) {
    let laps = store.get('initialState').laps
    return laps.filter(x => x.raceId === raceId && x.runnerId === runnerId)
}