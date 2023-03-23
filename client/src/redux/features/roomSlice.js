import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ updatedRoomData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createRoom(updatedRoomData);
      toast.success("Room Added Successfully");
      navigate("/dashboard/roommng");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRooms = createAsyncThunk(
  "room/getRooms",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getRooms(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllRooms = createAsyncThunk(
  "room/getAllRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllRooms();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getRoom(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteRoom(id);
      toast.success("Room Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateRoom = createAsyncThunk(
  "tour/updateRoom",
  async ({ id, updatedRoomData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateRoom(updatedRoomData, id);
      toast.success("Successfully");
      navigate("/dashboard/roommng");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRoomsByTag = createAsyncThunk(
  "room/getRoomsByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagRooms(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedRooms = createAsyncThunk(
  "room/getRelatedRooms",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedRooms(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeRoom = createAsyncThunk(
  "room/likeRoom",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeRoom(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const roomSlice = createSlice({
    name: "room",
    initialState: {
      room: {},
      rooms: [],
      userRooms: [],
      tagRooms: [],
      relatedRooms: [],
      currentPage: 1,
      numberOfPages: null,
      error: "",
      loading: false,
    },
    reducers: {
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
    },
    extraReducers: {
      [createRoom.pending]: (state, action) => {
        state.loading = true;
      },
      [createRoom.fulfilled]: (state, action) => {
        state.loading = false;
        state.rooms = [action.payload];
      },
      [createRoom.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getAllRooms.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllRooms.fulfilled]: (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      },
      [getAllRooms.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getRoom.pending]: (state, action) => {
        state.loading = true;
      },
      [getRoom.fulfilled]: (state, action) => {
        state.loading = false;
        state.room = action.payload;
      },
      [getRoom.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getRooms.pending]: (state, action) => {
        state.loading = true;
      },
      [getRooms.fulfilled]: (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      },
      [getRooms.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [deleteRoom.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteRoom.fulfilled]: (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.rooms = state.rooms.filter((item) => item._id !== id);
        }
      },
      [deleteRoom.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [updateRoom.pending]: (state, action) => {
        state.loading = true;
      },
      [updateRoom.fulfilled]: (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.rooms = state.rooms.map((item) =>
            item._id === id ? action.payload : item
          );
        }
      },
      [updateRoom.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getRoomsByTag.pending]: (state, action) => {
        state.loading = true;
      },
      [getRoomsByTag.fulfilled]: (state, action) => {
        state.loading = false;
        state.tagRooms = action.payload;
      },
      [getRoomsByTag.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getRelatedRooms.pending]: (state, action) => {
        state.loading = true;
      },
      [getRelatedRooms.fulfilled]: (state, action) => {
        state.loading = false;
        state.relatedRooms = action.payload;
      },
      [getRelatedRooms.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [likeRoom.pending]: (state, action) => {},
      [likeRoom.fulfilled]: (state, action) => {
        state.loading = false;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.rooms = state.rooms.map((item) =>
            item._id === _id ? action.payload : item
          );
        }
      },
      [likeRoom.rejected]: (state, action) => {
        state.error = action.payload.message;
      },
      
    }
})

export const { setCurrentPage } = roomSlice.actions;

export default roomSlice.reducer;