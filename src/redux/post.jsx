import instances from "../services/api/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Make new post
export const createPostAsync = createAsyncThunk(
  "post/createPostAsync",
  async ({ id, title, content, image, cat }, ThunkAPI) => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("image", image);
      data.append("cat", cat);

      const response = await instances.post(`/new/blog/${id}`, data, {
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

//Fetch all posts
export const fetchAllPostAsync = createAsyncThunk(
  "post/fetchAllPostAsync",
  async (ThunkAPI) => {
    try {
      const response = await instances.get("/");

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

// Get select post
// getRouter.get("/get/select/:id", getPostOnSelect);
export const getSelectedPost = createAsyncThunk(
  "post/getSelectedPost",
  async ({ id }, ThunkAPI) => {
    try {
      const response = await instances.get(`/get/select/${id}`);

      if (response.status === 200) {
        const { data } = response;
        return { data };
      }

      const msg = response.msg;
      return { msg };
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Make comment on a post
export const userMakeCommentOnPost = createAsyncThunk(
  "post/userMakeCommentOnPost",
  async ({ post_id, author, comment }, ThunkAPI) => {
    try {
      const response = await instances.post("/add/comment", {
        post_id,
        author,
        comment,
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

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectPost: null,
    isFetching: false,
    message: "",
  },
  reducers: {
    addPost: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    // Make a post or add post
    builder.addCase(createPostAsync.pending, (state) => {
      state.isFetching = true;
      state.message = "";
    });
    builder.addCase(createPostAsync.fulfilled, (state, { payload }) => {
      state.message = payload.data;
      state.isFetching = false;
    });
    builder.addCase(createPostAsync.rejected, (state, { payload }) => {
      state.message = payload.msg;
      state.isFetching = false;
    });
    // Fetch posts
    builder.addCase(fetchAllPostAsync.pending, (state) => {
      state.isFetching = true;
      state.message = "";
    });
    builder.addCase(fetchAllPostAsync.fulfilled, (state, { payload }) => {
      state.posts = payload.data;
      state.isFetching = false;
    });
    builder.addCase(fetchAllPostAsync.rejected, (state, { payload }) => {
      state.message = payload.msg;
      state.isFetching = false;
    });
    // Get Selected Post
    builder.addCase(getSelectedPost.pending, (state) => {
      state.isFetching = true;
      state.message = "";
    });
    builder.addCase(getSelectedPost.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.selectPost = payload.data;
      state.message = payload.msg;
    });
    builder.addCase(getSelectedPost.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.message = payload.msg;
    });

    // User make comment reducer
    builder.addCase(userMakeCommentOnPost.pending, (state) => {
      state.isFetching = true;
      state.message = "";
    });
    builder.addCase(userMakeCommentOnPost.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.message = payload.data;
    });
    builder.addCase(userMakeCommentOnPost.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.message = payload.msg;
    });
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
