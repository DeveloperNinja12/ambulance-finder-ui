import { combineReducers, configureStore } from '@reduxjs/toolkit';
import doctorsCollectionReducer from './features/doctors-slice';
import ambulancesCollectionReducer from './features/ambulances-slice';

export const store = configureStore({
    reducer: combineReducers({
        doctors: doctorsCollectionReducer,
        ambulances: ambulancesCollectionReducer
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;