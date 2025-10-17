import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const base_url = 'http://localhost:3000/products'

const initialState = {
    isLoading: false,
    products: [],
    currentProduct: null,
    message: ''
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    const res = await axios.get(base_url);
    return res.data
})

export const fetchCurentProduct = createAsyncThunk('products/fetchCurrentProduct', async(id) => {
    const res = await axios.get(`${base_url}/${id}`)
    return res.data
})

export const deleteCurentProduct = createAsyncThunk('products/deleteCurentProduct', async(id) => {
    await axios.delete(`${base_url}/${id}`)
})

export const updateCurrentProduct = createAsyncThunk('products/updateCurrentProduct', async({ id, data }) => {
    const res = await axios.put(`${base_url}/${id}`, data)
    return res.data
})

export const addProduct = createAsyncThunk('products/addProduct', async(data) => {
    await axios.post(base_url, data)
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // All Products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.message = 'Products not found '
            })
            // Current Product
            .addCase(fetchCurentProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurentProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentProduct = action.payload
            })
            .addCase(fetchCurentProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.message = 'Product detail not found '
            })
            // Delete Product
            .addCase(deleteCurentProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurentProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.currentProduct = null
            })
            .addCase(deleteCurentProduct.rejected, (state) => {
                state.isLoading = false;
                state.message = 'Product does not deleted '
            })
            // Update Product 
            .addCase(updateCurrentProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentProduct = action.payload
            })
            .addCase(updateCurrentProduct.rejected, (state) => {
                state.isLoading = false;
                state.message = 'Product does not Updated '
            })
            // Add Product 
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state) => {
                state.isLoading = false;
                state.message = 'Product does not Created '
            })
    }

})


export default productSlice.reducer