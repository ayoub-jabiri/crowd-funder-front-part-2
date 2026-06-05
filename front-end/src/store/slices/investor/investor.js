import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

const token = localStorage.getItem("token");

export const getDashboardData = createAsyncThunk(
    "investor/fetchDashboardData",
    async () => {
        try {
            const response = await axios.get(
                `${VITE_API_URL}/investment/investor/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            // throw error;
        }
    }
);

export const getBalance = createAsyncThunk(
    "investor/festchBalance",
    async () => {
        try {
            const response = await axios.get(`${VITE_API_URL}/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.balance;
        } catch (error) {
            // throw error;
        }
    }
);

const investorSlice = createSlice({
    name: "investor",
    initialState: {
        dashboardData: null,
        investments: [],
        balance: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDashboardData.fulfilled, (state, action) => {
            state.dashboardData = action.payload;
        });

        builder.addCase(getBalance.fulfilled, (state, action) => {
            state.balance = action.payload;
        });
    },
});

// export const {} = investorSlice.actions;
export default investorSlice.reducer;
