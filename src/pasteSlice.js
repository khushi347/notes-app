import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      if (!paste || !paste._id) return;

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Note Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;

      if (!paste || !paste._id) {
        toast.error("Invalid note data. Cannot update.");
        return;
      }

      // ✅ Filter out any null values before searching
      state.pastes = state.pastes.filter(item => item !== null && item !== undefined);

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = { ...state.pastes[index], ...paste };
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Note Updated Successfully!");
      } else {
        toast.error("Note not found for update.");
      }
    },

    removeFromPastes: (state, action) => {
      const pasteID = action.payload;
      state.pastes = state.pastes.filter(item => item?._id !== pasteID);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Note Deleted");
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
