import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instances from "../services/api/axios";

// Login
export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async ({ email, password }, ThunkAPI) => {
    try {
      const response = await instances.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }

      const msg = response.data;
      return { msg };
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Register

export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async ({ fname, lname, email, password }, ThunkAPI) => {
    try {
      const response = await instances.post("/auth/register", {
        fname,
        lname,
        email,
        password,
      });

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }

      const msg = response.data;
      return { msg };
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update my profile image
export const updateMyProfileAsync = createAsyncThunk(
  "user/updateMyProfileAsync",
  async ({ id, image }, ThunkAPI) => {
    try {
      const data = new FormData();
      data.append("image", image);

      const response = await instances.put(`/upload/${id}`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }

      const msg = response.data;
      return { msg };
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update my profile details

export const updateMyProfileDetailsAsync = createAsyncThunk(
  "user/updateMyProfileDetailsAsync",
  async ({ id, fname, lname, email, bio }, ThunkAPI) => {
    try {
      const response = await instances.patch(`/update/info/${id}`, {
        fname,
        lname,
        email,
        bio,
      });

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }

      const msg = response.data;
      return { msg };
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get my profile details
export const getMyProfileDetailsAsync = createAsyncThunk(
  "user/getMyProfileDetailsAsync",
  async ({ id }, ThunkAPI) => {
    try {
      const response = await instances.get(`/profile/${id}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }

      const msg = response.data;
      return { msg };
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    error: "",
    message: "",
  },
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUserAsync.pending, (state) => {
      state.message = "";
      state.isFetching = true;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.message = payload.msg;
      state.isFetching = false;
    });
    builder.addCase(loginUserAsync.rejected, (state, { payload }) => {
      state.message = payload.msg;
      state.isFetching = false;
    });

    // Register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.message = "";
      state.isFetching = true;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => {
      state.message = payload.data;
      state.isFetching = false;
      state.message = payload.msg;
    });
    builder.addCase(registerUserAsync.rejected, (state, { payload }) => {
      state.message = payload.msg;
      state.isFetching = false;
    });

    // update my profile reducer

    builder.addCase(updateMyProfileAsync.pending, (state) => {
      state.isFetching = true;
      state.message = "";
    });

    builder.addCase(updateMyProfileAsync.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      console.log(payload.data);
    });

    // Update my profile details

    builder.addCase(updateMyProfileDetailsAsync.pending, (state) => {
      state.isFetching = true;
      state.message = "";
    });

    builder.addCase(
      updateMyProfileDetailsAsync.fulfilled,
      (state, { payload }) => {
        state.isFetching = false;
        state.message = payload.data;
      }
    );

    builder.addCase(
      updateMyProfileDetailsAsync.rejected,
      (state, { payload }) => {
        state.isFetching = false;
        state.message = payload.msg;
      }
    );

    // Update my profile details info

    builder.addCase(getMyProfileDetailsAsync.pending, (state) => {
      state.isFetching = true;
      state.message = "";
      state.user = null;
    });

    builder.addCase(
      getMyProfileDetailsAsync.fulfilled,
      (state, { payload }) => {
        state.isFetching = false;
        state.user = payload.data;
      }
    );

    builder.addCase(getMyProfileDetailsAsync.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.message = payload.msg;
    });
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
