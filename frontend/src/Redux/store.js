import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './productsApi'
import { oneProductApi } from './productsApi'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        //  "carttt" ======>  useSelector
        carttt: cartReducer,
        // Add the generated reducer as a specific top-level slice
        [productsApi.reducerPath]: productsApi.reducer,
        [oneProductApi.reducerPath]: oneProductApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware).concat(oneProductApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)