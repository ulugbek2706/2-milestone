import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    customerCategoryAll: [],
    totalCustomerCategory: 0,
    modalCustomer: false,
    currentCustomerCategory: "",
    editData: "",
    photos: [],
    imgFileUrl: null,
    imgFile: null,
    currentSelectedImage: null
};
const customerCategorySlice = createSlice({
    name: "customerCategory",
    initialState,
    reducers: {

        saveCustomerCategory: (state, action) => {
        },
        getCustomerCategory: (state, action) => {
        },
        getCustomerCategorySuccess: (state, action) => {
            state.customerCategoryAll = action.payload;
        },
        getAllCustomerCategory: (state, action) => {
            state.totalCustomerCategory = action.payload;
        },
        setCustomerModal: (state, action) => {
            state.editData = {
                name: "",
                description: "",
                code: "",
                active: false
            }
            state.modalCustomer = action.payload;
        },

        changeCurrentCustomerCategory: (state, action) => {
            state.currentCustomerCategory = action.payload
        },
        setEditData: (state, action) => {
            state.editData = action.payload
        },
        getCategoryPhotosSuccess: (state, action) => {
            state.photos = action.payload
        },
        saveCustomerImgFileUrl: (state, action) => {
            state.imgFileUrl = action.payload
        },
        saveCustomerImgFile: (state, action) => {
            state.imgFile = action.payload
        },
        setCurrentSelectedImage: (state, action) => {
            state.currentSelectedImage = action.payload
        }
    },
});
export const {
    saveCustomerCategory,
    getCustomerCategory,
    setCustomerModal,
    getAllCustomerCategory,
    getCustomerCategorySuccess,
    setEditData,
    changeCurrentCustomerCategory,
    getCategoryPhotosSuccess,
    saveCustomerImgFileUrl,
    saveCustomerImgFile,
    setCurrentSelectedImage
} = customerCategorySlice.actions;
export default customerCategorySlice.reducer;
