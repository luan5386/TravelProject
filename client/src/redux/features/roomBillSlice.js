import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createRoomBill = createAsyncThunk(
    "roomBill/createRoomBill",
    async ({ updatedRoomBillData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createRoomBill(updatedRoomBillData);
            toast.success("Successful booking");
            navigate("/room");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getRoomsByUser = createAsyncThunk(
  "roomBill/getRoomsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getRoomsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRoomBills = createAsyncThunk(
  "roomBill/getRoomBills",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await api.getRoomBills();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const roomBillSlice = createSlice({
    name: "roomBill",
    initialState: {
        roomBill: {},
        roomBills: [],
        userRoomBills: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [createRoomBill.pending]: (state, action) => {
            state.loading = true;
        },
        [createRoomBill.fulfilled]: (state, action) => {
            state.loading = false;
            state.roomBills = [action.payload];
        },
        [createRoomBill.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getRoomsByUser.pending]: (state, action) => {
          state.loading = true;
        },
        [getRoomsByUser.fulfilled]: (state, action) => {
          state.loading = false;
          state.userRoomBills = action.payload;
        },
        [getRoomsByUser.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },
        [getRoomBills.pending]: (state, action) => {
          state.loading = true;
        },
        [getRoomBills.fulfilled]: (state, action) => {
          state.loading = false;
          state.roomBills = action.payload;
        },
        [getRoomBills.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },
    },
});

export default roomBillSlice.reducer;
