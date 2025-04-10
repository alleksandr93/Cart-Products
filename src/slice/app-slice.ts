import {createSlice} from '@reduxjs/toolkit';
import type {FilterType} from '../types/types.ts';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        filter: 'all' as FilterType,
    },
    reducers: (create) => ({
        setFilterAC: create.reducer<{ filter: FilterType }>((state, action) => {
            state.filter = action.payload.filter
        }),

    }),
    selectors: {
        selectApp: state => state
    }
})
export const {setFilterAC} = appSlice.actions;
export const appReducer = appSlice.reducer
export const {selectApp} =appSlice.selectors