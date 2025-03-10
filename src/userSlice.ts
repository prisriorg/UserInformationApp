// features/users/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
}

interface UserState {
  users: User[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentIndex: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'user/fetchUsers',
  async () => {
    const response = await fetch(
      'https://random-data-api.com/api/users/random_user?size=80'
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: User[] = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    nextUser: (state) => {
      if (state.currentIndex < state.users.length - 1) {
        state.currentIndex++;
      }
    },
    previousUser: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch data';
    });
  },
});

export const { nextUser, previousUser } = userSlice.actions;
export default userSlice.reducer;
