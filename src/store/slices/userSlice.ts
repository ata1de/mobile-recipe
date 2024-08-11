import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user: {
        name: string
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: ''
    },
    reducers: {
        setUserName: (state, action) => {
            state.name = action.payload
        }
    }
}) 

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;