import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    choiseUsers: [],
    isLoading: true,
    inputValue: '',
    oneUser: {},
    test: []
}


export const users = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getFilteredUsers: (state, action) => {
            state.isLoading = true
            state.choiseUsers = action.payload;
            state.choiseUsers = state.choiseUsers.map(item => ({ ...item, isActive: "false" }));
            state.isLoading = false
        },
        getValueFromInput: (state, action) => {
            state.isLoading = true
            state.inputValue = action.payload;
        },
        getOneUser: (state, action) => {
            state.oneUser = action.payload
            // console.log("клиент в редаксе", state.oneUser, "сосотояние экшена одного клиента", action.payload)
        },
        testUseSlice: (state, action) => {
            state.test = action.payload
        }
    }
})

export const { getFilteredUsers, getValueFromInput, getOneUser, testUseSlice } = users.actions

export default users.reducer