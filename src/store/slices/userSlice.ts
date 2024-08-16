import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user: {
        isLoggedIn: boolean
    }
}
;

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
    }
}) 

export const { setLoggedIn } = userSlice.actions;

export default userSlice.reducer;