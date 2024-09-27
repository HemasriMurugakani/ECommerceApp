import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for fetching items
export const fetchCatalogItems = createAsyncThunk('catalog/fetchItems', async () => {
  const response = await fetch('https://dummyjson.com/c/74f2-c4c9-4651-aae9');
  const data = await response.json();
  return data.items; // Assumes that data contains an 'items' array
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatalogItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCatalogItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default catalogSlice.reducer;
