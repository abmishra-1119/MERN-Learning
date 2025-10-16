import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const base_url = 'http://localhost:3000/users'

const initialState = {
    isLoading: false,
    users: [],
    user: {},
    message: ''
}

export const loginUser = createAsyncThunk('user/loginUser', async(form) => {
    try {
        const users = await axios.get(`${base_url}`)
        const findUser = users.find((user) => user.username === form.username && user.password === form.password)
        return findUser
    } catch (error) {
        console.error('Error fetching data:', error);
    }

})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                if (findUser) {
                    localStorage.setItem("user", JSON.stringify(findUser))
                    confirm('Login Succesfully')
                    navigate('/')
                } else {
                    dispatch({ type: 'message', payload: 'Login Failed' })
                }
                console.log(users.data);
                state.users = action.payload
            }).addCase(loginUser.rejected, (state) => {
                state.message = "Users failed to get"
            })
    }
})

export default userSlice.reducer