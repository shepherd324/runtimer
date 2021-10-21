import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';


export default function configureStore(initialState) {
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
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
        //applyMiddleware(thunk, dataService)
    );
}