import {call, put, select, takeLatest} from "redux-saga/effects";


import {toast} from "react-toastify";
import {
    changeCurrentCustomerCategory,
    getCategoryPhotosSuccess, saveCustomerImgFile, saveCustomerImgFileUrl
} from "components/customerCategory/reducers/CustomerCategorySlice";
import ApiCall from "API/ApiCall";

function* workSaveCustomerCategory(action) {
    console.log(action.payload)
    const currentStates = yield select((state) => state.customerCategory);
    const tableState = yield select((state) => state.table);
    const territoryState = yield select((state) => state.territory);


    try {
        const obj = {
            name: action.payload.name,
            description: action.payload.description,
            code: action.payload.code,
            active: action.payload.active,
        }
        if (currentStates.currentCustomerCategory !== "") {
            const response = yield call(ApiCall, "/api/customer_category/" + currentStates.currentCustomerCategory.id, "PUT", obj);
            toast.success("update successful")
            yield put(changeCurrentCustomerCategory(""))
            yield put(saveCustomerImgFile(null));
            yield put(saveCustomerImgFileUrl(null));
        } else {
            const response = yield call(ApiCall, "/api/customer_category", "POST", obj);
            toast.success("save successful")

        }

        yield put({
            type: "territory/getTerritory",
            payload: {
                pageSize: tableState.pageSize,
                page: tableState.currentPage,
                totalElements: territoryState.allTerritorys,
                active: tableState.tableActive,
                search: tableState.searchInpValue,
                url: tableState.url,
            },
        });

    } catch (error) {
    }
}

function* workGetCategoryPhotos() {
    try {
        // const respons = yield call(ApiCall, "/api/attachment/fba801e9-9e7e-416b-9aa3-085b5038f058/public", "GET");
        // const response = yield call(ApiCall, "/api/attachment/default", "GET");
    } catch (e) {
        const file = new File([e.response.data], 'filename.webp', {type: 'image/webp'});
        // yield put(getCategoryPhotosSuccess(e.response.data))
    }
}


export function* CustomerCategorySaga() {
    yield takeLatest(
        "customerCategory/saveCustomerCategory",
        workSaveCustomerCategory
    );

    yield takeLatest(
        "customerCategory/getCategoryPhotos",
        workGetCategoryPhotos
    );
}
