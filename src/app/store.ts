import {configureStore} from '@reduxjs/toolkit'
import {productsReducer, productsSlice} from '../slice/products-slice.ts';
import {appReducer, appSlice} from '../slice/app-slice.ts';


// создание store
export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsReducer,
        [appSlice.name]: appReducer,
    },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store