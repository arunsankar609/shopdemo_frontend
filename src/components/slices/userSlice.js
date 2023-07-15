import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [],
};

const dataUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setData: (state, action) => {
        state.userData = action.payload;
      },
    },
  });

  export const { setData } = dataUser.actions;
export default dataUser.reducer;