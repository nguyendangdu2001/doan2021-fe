import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  loading: {
    [key: string]: boolean;
  };
}

const initialState: ChatState = {
  loading: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startPreload: (state, action) => {
      state.loading[action.payload?.roomId] = true;
    },
    finishPreload: (state, action) => {
      state.loading[action.payload?.roomId] = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { finishPreload, startPreload } = chatSlice.actions;

export default chatSlice.reducer;
