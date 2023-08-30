import { createSlice } from "@reduxjs/toolkit";

const dragSlice = createSlice({
  name: "drag",
  initialState: {
    changedColumns: [],
    color: "bg-gray-500",
  },
  reducers: {
    changeChangedColumns: (state, action) => {
      state.changedColumns = action.payload;
    },
    setChangedColumns: (state, action) => {
      if (action.payload.selectedItem > action.payload.index) {
        state.color="bg-gray-500 "
        for (
          let index = action.payload.selectedItem;
          index > action.payload.index;
          index--
        ) {
          state.changedColumns[index] = state.changedColumns[index - 1];
        }
        state.changedColumns[action.payload.index] = action.payload.current;
        localStorage.setItem(
          action.payload.locName + "_copy",
          JSON.stringify(state.changedColumns)
        );
      } else if (action.payload.selectedItem < action.payload.index) {
        state.color="bg-gray-500 translate-y-[-2px]"
        for (
          let index = action.payload.selectedItem;
          index < action.payload.index;
          index++
        ) {
          state.changedColumns[index] = state.changedColumns[index + 1];
        }
        state.changedColumns[action.payload.index] = action.payload.current;
        localStorage.setItem(
          action.payload.locName + "_copy",
          JSON.stringify(state.changedColumns)
        );
      }
    },
    setColor: (state, action) => {
      state.color = action.payload;

    },
  },
});

export const { changeChangedColumns, setChangedColumns, setColor } =
  dragSlice.actions;
export default dragSlice.reducer;
