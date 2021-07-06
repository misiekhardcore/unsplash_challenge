import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { Photo } from "../types";

interface IGetAllPhotos {
  photos: Photo[];
  isNext: boolean;
}

export interface ProductsState extends IGetAllPhotos {
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: ProductsState = {
  isNext: true,
  photos: [],
  loading: false,
  error: undefined,
};

export const getAllPhotos = createAsyncThunk<
  IGetAllPhotos,
  { page: number; search: string },
  { rejectValue: SerializedError }
>(
  "photos/getAllPhotos",
  async ({ page = 0, search = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get<IGetAllPhotos>(
        `${process.env.REACT_APP_API_URI}/api/photos/?page=${page}&search=${search}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPhoto = createAsyncThunk<
  Photo,
  { label: string; url: string },
  { rejectValue: SerializedError }
>("photo/createPhoto", async (photo, { rejectWithValue }) => {
  try {
    if (!(photo.label.trim() && photo.url.trim()))
      return rejectWithValue({
        message: "url and/or label cannot be empty",
      });
    const response = await axios.post<Photo>(
      `${process.env.REACT_APP_API_URI}/api/photos/`,
      { ...photo, user: 1 }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePhoto = createAsyncThunk<
  boolean,
  { id: number },
  { rejectValue: SerializedError }
>("photo/deletePhoto", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<boolean>(
      `${process.env.REACT_APP_API_URI}/api/photos/${id}`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    clearPhotos: (state) => {
      state.photos = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos.push(...action.payload.photos);
        state.isNext = action.payload.isNext;
        state.error = undefined;
      })
      .addCase(getAllPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photos.unshift(action.payload);
        state.error = undefined;
      })
      .addCase(createPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = state.photos.filter(
          (p) => p.id !== action.meta.arg.id
        );
        state.error = undefined;
      });
  },
});

export const { clearPhotos } = photosSlice.actions;

export const selectPhotos = (state: RootState) => state.photos;

export default photosSlice.reducer;
