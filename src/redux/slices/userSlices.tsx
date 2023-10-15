import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from "../../types";

interface IState {
    choiseUsers: User[],
    isLoading: boolean,
    inputValue: string,
    oneUser: User
}

const initialState: IState = {
    choiseUsers: [],
    isLoading: true,
    inputValue: '',
    oneUser: {},
}


export const users = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getFilteredUsers: (state, action: PayloadAction<User[]>) => {
            state.isLoading = true
            state.choiseUsers = action.payload;
            state.choiseUsers = state.choiseUsers.map(item => ({ ...item, isActive: "false" }));
            state.isLoading = false
        },
        getValueFromInput: (state, action: PayloadAction<string>) => {
            state.isLoading = true
            state.inputValue = action.payload;
        },
        getOneUser: (state, action: PayloadAction<User>) => {
            state.oneUser = action.payload
        },
    }
})

export const { getFilteredUsers, getValueFromInput, getOneUser } = users.actions

export default users.reducer