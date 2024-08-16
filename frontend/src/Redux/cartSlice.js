import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProducts: localStorage.getItem("selectedProducts") ? JSON.parse(localStorage.getItem("selectedProducts")) : [],
    selectedProductsId: localStorage.getItem("selectedProductsId") ? JSON.parse(localStorage.getItem("selectedProductsId")) : [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        // --------------------------- //

        addToCart: (state, action) => {

            // state.value += action.payload
            const productWithQuantity = { ...action.payload, "quantity": 1 };

            state.selectedProducts.push(productWithQuantity);

            state.selectedProductsId.push(action.payload.id);

            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
            localStorage.setItem("selectedProductsId", JSON.stringify(state.selectedProductsId));

        },

        // --------------------------- //

        increaseQuantity: (state, action) => {

            // state.value += action.payload
            const increasedProduct = state.selectedProducts.find((item) => {
                return item.id === action.payload.id;
            })

            increasedProduct.quantity += 1;

            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
        },

        // --------------------------- //

        decreaseQuantity: (state, action) => {

            const decreasedProduct = state.selectedProducts.find((item) => {
                return item.id === action.payload.id;
            })

            decreasedProduct.quantity -= 1

            if (decreasedProduct.quantity === 0) {
                // delete the product
                const newArr = state.selectedProducts.filter((item) => {
                    return item.id !== action.payload.id;
                });

                state.selectedProducts = newArr;

                const newArrTwo = state.selectedProductsId.filter((item) => {
                    return item !== action.payload.id;
                });

                state.selectedProductsId = newArrTwo;

                localStorage.setItem("selectedProductsId", JSON.stringify(state.selectedProductsId));

            }

            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));

        },

        // --------------------------- //

        deleteProduct: (state, action) => {

            const newArr = state.selectedProducts.filter((item) => {
                return item.id !== action.payload.id;
            });

            state.selectedProducts = newArr;

            const newArrTwo = state.selectedProductsId.filter((item) => {
                return item !== action.payload.id;
            });

            state.selectedProductsId = newArrTwo;

            localStorage.setItem("selectedProductsId", JSON.stringify(state.selectedProductsId));

            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));

        },

        // --------------------------- //

    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;