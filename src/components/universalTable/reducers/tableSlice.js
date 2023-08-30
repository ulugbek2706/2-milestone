import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    columnOrderModal: false,
    data: [],
    allData: [],
    url: "",
    loading: false,
    tableActive: "",
    currentPage: 1,
    modalColumns: [],
    currentDragingColumn: 0,
    columnOrderModalVisibility: false,
    pageSize: 10,
    searchInpValue: "",
    timeoutId: "",
    columns: [],
    error: null,
    localOrderOfColumns: [],
  },
  reducers: {
    saveLocalTest: (state, action) => {
      state.localOrderOfColumns = action.payload;
    },
    saveColumns: (state, action) => {
      state.columns = action.payload;
    },
    changeTableActive: (state, action) => {
      state.tableActive = action.payload;
    },

    setTimeOutId: (state, action) => {
      state.timeoutId = action.payload;
    },
    handleSearchInpValue: (state, action) => {
      state.searchInpValue = action.payload;
    },
    getDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setModalColumns: (state, action) => {
      state.modalColumns = action.payload;
    },
    saveColumnOrder: (state, action) => {
      state.columns = state.modalColumns;
    },
    setColumnModalVisibility: (state, action) => {
      state.columnOrderModalVisibility = action.payload;
    },
    setDragingColumn: (state, action) => {
      state.currentDragingColumn = action.payload;
    },
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllDataSuccess: (state, action) => {
      state.allData = action.payload;
    },
    getDataFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    changePageOfSize: (state, action) => {
      state.pageSize = action.payload;
    },
    changeVisibleOfColumn: (state, action) => {
      const selectAction = action.payload.action;
      let arr = action.payload.state;
      if (selectAction.action === "select-option") {
        for (let i = 0; i < arr.length; i++) {
          for (let index = 0; index < state.columns.length; index++) {
            if (arr[i].value === state.columns[index].key) {
              state.columns[index].show = false;
            }
          }
        }
      }
      if (selectAction.action === "remove-value") {
        for (let i = 0; i < state.columns.length; i++) {
          if (state.columns[i].key === selectAction.removedValue.value) {
            state.columns[i].show = true;
          }
        }
      }
      if (selectAction.action === "clear") {
        for (let i = 0; i < state.columns.length; i++) {
          state.columns[i].show = true;
        }
      }
     
      if (selectAction.action === "pop-value") {
        for (let i = 0; i < state.columns.length; i++) {
          if (state.columns[i].key === selectAction.removedValue.value) {
            state.columns[i].show = true;
          }
        }
      }
    },
    dropColumn: (state, action) => {
      const { currentDragingColumn } = state;
      const draggedElementIndex = currentDragingColumn;
      const droppedElementIndex = action.payload;

      [
        state.modalColumns[draggedElementIndex],
        state.modalColumns[droppedElementIndex],
      ] = [
        state.modalColumns[droppedElementIndex],
        state.modalColumns[draggedElementIndex],
      ];
    },
    setColumnOrderModal: (state, action) => {
      state.columnOrderModal = action.payload;
    },
    changeUrl: (state, action) => {
      state.url = action.payload;
    },
    reorderColumns: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const updatedColumns = [...state.modalColumns];
      const [draggedColumn] = updatedColumns.splice(sourceIndex, 1);
      updatedColumns.splice(destinationIndex, 0, draggedColumn);

      state.modalColumns = updatedColumns;
    },
  },
});

export const getData = (mapData) => ({
  type: "table/getPosts",
  payload: {
    mapData,
  },
});

export const {
  getDataFailure,
  setColumnModalVisibility,
  getDataStart,
  getDataSuccess,
  changePageOfSize,
  changeVisibleOfColumn,
  setDragingColumn,
  setCurrentPage,
  clearFilterVisible,
  dropColumn,
  getAllDataSuccess,
  setModalColumns,
  saveColumnOrder,
  handleSearchInpValue,
  setTimeOutId,
  changeTableActive,
  saveColumns,
  setColumnOrderModal,
  changeUrl,
  reorderColumns,
  saveLocalTest,
} = tableSlice.actions;
export default tableSlice.reducer;
