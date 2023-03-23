import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.signIn(formValue);
            toast.success("Login Successfully");
            navigate("/");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.signUp(formValue);
            toast.success("Register Successfully");
            navigate("/login");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUsers = createAsyncThunk(
    "auth/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getUsers();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createUser = createAsyncThunk(
    "auth/createUser",
    async ({ updatedUserData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createUser(updatedUserData);
            toast.success("User Added Successfully");
            navigate("/dashboard/usermng");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deleteUser(id);
            toast.success("User Deleted Successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (
        { id, updatedUserData, toast, navigate, userId },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.updateUser(updatedUserData, id);
            toast.success("User Updated Successfully");
            if (userId === id) {
                navigate("/user/information");
            } else {
                navigate("/dashboard/usermng");
            }
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (
        { id, updatedUserData, toast, navigate },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.changePassword(updatedUserData, id);
            toast.success("Thay đổi mật khẩu thành công");
                navigate("/");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// export const checkLogin = createAsyncThunk(
//   "auth/check",
//   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//     try {
//       const response = await api.signIn(formValue);
//       toast.success("Login Successfully");
//       navigate("/");
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const initialState = {
    user: null,
    users: [],
    error: "",
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action.payload })
            );
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [createUser.pending]: (state, action) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = [action.payload];
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { id },
            } = action.meta;
            if (id) {
                state.users = state.users.filter((item) => item._id !== id);
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { id },
            } = action.meta;
            if (id) {
                state.users = state.users.map((item) =>
                    item._id === id ? action.payload : item
                );
            }
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false;
            const {
                arg: { id },
            } = action.meta;
            if (id) {
                state.users = state.users.map((item) =>
                    item._id === id ? action.payload : item
                );
            }
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
