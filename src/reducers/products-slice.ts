import {createSlice} from '@reduxjs/toolkit';
import type {ProductsType} from '../types/types.ts';


export const productsSlice = createSlice({
    name: 'products',
    initialState: [] as ProductsType[],
    reducers: (create) => ({
        deleteProductAC: create.reducer<{ productId: string }>((state, action) => {
            const index = state.findIndex(f => f.id === action.payload.productId)
            if (index > -1) state.splice(index, 1)
        }),
        setProductsAC: create.reducer<{ products: ProductsType[] }>((_, action) => {
            return action.payload.products
        }),
        likeProductAC: create.reducer<{ id: string, like: boolean }>((state, action) => {
            const obj = state.find(el => el.id === action.payload.id)
            if (obj) {
                if (action.payload.like) {
                    obj.like = false
                    obj.numberLike -= 1
                }else{
                    obj.like = true
                    obj.numberLike += 1
                }
            }

        }),

    }),
    selectors: {
        selectProducts: state => state
    }
})
export const {deleteProductAC, setProductsAC,likeProductAC} = productsSlice.actions;
export const productsReducer = productsSlice.reducer
export const {selectProducts} = productsSlice.selectors