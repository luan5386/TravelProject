import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTourBill = createAsyncThunk(
    "tourBill/createTourBill",
    async ({ updatedTourBillData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createTourBill(updatedTourBillData);
            toast.success("Successful booking");
            navigate("/tours");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getTourBills = createAsyncThunk(
  "tourBill/getTourBills",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await api.getTourBills();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tourBill/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourBillSlice = createSlice({
    name: "tourBill",
    initialState: {
        tourBill: {},
        tourBills: [],
        userTourBills: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [createTourBill.pending]: (state, action) => {
            state.loading = true;
        },
        [createTourBill.fulfilled]: (state, action) => {
            state.loading = false;
            state.tourBills = [action.payload];
        },
        [createTourBill.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getToursByUser.pending]: (state, action) => {
          state.loading = true;
        },
        [getToursByUser.fulfilled]: (state, action) => {
          state.loading = false;
          state.userTourBills = action.payload;
        },
        [getToursByUser.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },
        [getTourBills.pending]: (state, action) => {
          state.loading = true;
        },
        [getTourBills.fulfilled]: (state, action) => {
          state.loading = false;
          state.tourBills = action.payload;
        },
        [getTourBills.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },
    },
});

export default tourBillSlice.reducer;
