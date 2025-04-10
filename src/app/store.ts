import {configureStore} from '@reduxjs/toolkit'
import {productsReducer, productsSlice} from '../reducers/products-slice.ts';


// создание store
export const store = configureStore({
    reducer: {
        [productsSlice.name]: productsReducer,
    },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store