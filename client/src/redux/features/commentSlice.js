import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createComment = createAsyncThunk(
    "comment/createComment",
    async (
        { id, updatedCommentData, toast },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.createComment(updatedCommentData);
            toast.success("Comment Added Successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCommentsByService = createAsyncThunk(
    "comment/getCommentsByService",
    async (serviceId, { rejectWithValue }) => {
        try {
            const response = await api.getCommentsByService(serviceId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCommentsById = createAsyncThunk(
    "comment/getCommentsById",
    async (cmtId, { rejectWithValue }) => {
        try {
            const response = await api.getCommentsById(cmtId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async ({ cmtId, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deleteComment(cmtId);
            toast.success("Comment Deleted Successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateComment = createAsyncThunk(
    "comment/updateComment",
    async ({ cmtId, updatedCommentData, toast }, { rejectWithValue }) => {
        try {
            const response = await api.updateComment(updatedCommentData, cmtId);
            toast.success("Successful");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comment: {},
        comments: [],
        error: "",
        loading: false,
    },
    extraReducers: {
        [createComment.pending]: (state, action) => {
            state.loading = true;
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments = [...state.comments, action.payload];
        },
        [createComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getCommentsByService.pending]: (state, action) => {
            state.loading = true;
        },
        [getCommentsByService.fulfilled]: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        },
        [getCommentsByService.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getCommentsById.pending]: (state, action) => {
            state.loading = true;
        },
        [getCommentsById.fulfilled]: (state, action) => {
            state.loading = false;
            state.comment = action.payload;
        },
        [getCommentsById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteComment.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { cmtId },
            } = action.meta;
            if (cmtId) {
                state.comments = state.comments.filter(
                    (item) => item._id !== cmtId
                );
            }
        },
        [deleteComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateComment.pending]: (state, action) => {
            state.loading = true;
        },
        [updateComment.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { cmtId },
            } = action.meta;
            if (cmtId) {
                state.comments = state.comments.map((item) =>
                    item._id === cmtId ? action.payload : item
                );
            }
        },
        [updateComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export default commentSlice.reducer;
