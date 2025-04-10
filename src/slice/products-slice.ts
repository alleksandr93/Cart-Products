import {createSlice} from '@reduxjs/toolkit';
import type {ProductsType} from '../types/types.ts';


export const productsSlice = createSlice({
    name: 'products',
    initialState: [] as ProductsType[],
    reducers: (create) => ({
        deleteProductAC: create.reducer<{ productId: string }>((state, action) => {
            const index = state.findIndex(f => f.id === action.payload.productId)
            if (index > -1) state.splice(index, 1)
            sessionStorage.setItem('myArrayKey', JSON.stringify(state));
        }),
        setProductsAC: create.reducer<{ products: ProductsType[] }>((_, action) => {
            sessionStorage.setItem('myArrayKey', JSON.stringify(action.payload.products));
            return action.payload.products
        }),
        likeProductAC: create.reducer<{ id: string, like: boolean, }>((state, action) => {

            const obj = state.find(el => el.id === action.payload.id)
            if (obj) {
                if (action.payload.like) {
                    obj.like = false
                    obj.numberLike -= 1
                    sessionStorage.setItem('myArrayKey', JSON.stringify(state));
                } else {
                    obj.like = true
                    obj.numberLike += 1
                    sessionStorage.setItem('myArrayKey', JSON.stringify(state));
                }
            }

        }),
        filterFavoriteAC: create.reducer((state) => {
            return state.filter(el => el.like)
        }),
        filterAllAC: create.reducer(() => {
            const storedArrayString = sessionStorage.getItem("myArrayKey");
            if(storedArrayString){
                const parsedArray = JSON.parse(storedArrayString);
                if(parsedArray){
                    return parsedArray as ProductsType[]
                }
            }

        }),

        addProductAC: create.reducer<{ formData: ProductsType }>((state, action)=>{
            state.push({...action.payload.formData})
            sessionStorage.setItem('myArrayKey', JSON.stringify(state));
        })
    }),
    selectors: {
        selectProducts: state => state
    }
})
export const {deleteProductAC, setProductsAC, likeProductAC, filterFavoriteAC,filterAllAC,addProductAC} = productsSlice.actions;
export const productsReducer = productsSlice.reducer
export const {selectProducts} = productsSlice.selectors