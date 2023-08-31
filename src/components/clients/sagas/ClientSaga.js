import {call, put, select, takeLatest} from "redux-saga/effects";
import {toast} from "react-toastify";
import {
    getAllCustomerCategorySuccess,
    getAllLocationsFailure, getAllLocationsStart, getAllLocationsSuccess,
    updateCurrentClient
} from "components/clients/reducers/ClientSlice";
import ApiCall from "API/ApiCall";

// save client
function* workSaveClient(action) {
    const tableState = yield select((state) => state.table);
    const currentStates = yield select((state) => state.territory);
    const clientStates = yield select((state) => state.client);
    let {
        address,
        category,
        referencePoint,
        companyName,
        lat,
        long,
        name,
        telephone,
        territory,
        tin,
        active,
    } = action.payload;
    let obj = {
        name: name,
        address: address,
        telephone: telephone,
        tin: tin,
        referencePoint: referencePoint,
        companyName: companyName,
        categoryId: category.value,
        territoryId: territory.value,
        longitude: long,
        latitude: lat,
        active: active,
    };

    try {
        if (clientStates.currentClient !== "") {
            console.log(clientStates.currentClient);
            const response = yield call(
                ApiCall,
                "/api/client/edit/" + clientStates.currentClient.id,
                "PUT",
                {
                    name: name,
                    address: address,
                    telephone: telephone,
                    tin: tin === "" ? null : tin,
                    referencePoint: referencePoint,
                    companyName: companyName,
                    categoryId: category.value,
                    territoryId: territory.value,
                    longitude: long,
                    latitude: lat,
                    active: active,
                }
            );
            yield put(updateCurrentClient(""));
            toast.success("update successful")
        } else {
            const res = yield call(ApiCall, "/api/client", "POST", obj);
            yield put(updateCurrentClient(""));
            toast.success("saved successful")
        }
        yield put({
            type: "territory/getTerritory",
            payload: {
                pageSize: tableState.pageSize,
                page: tableState.currentPage,
                totalElements: currentStates.allTerritorys,
                active: tableState.tableActive,
                search: tableState.searchInpValue,
                url: tableState.url,
            },
        });
    } catch (error) {
    }
}


function* workGetAllCustomerCategory() {
    try {
        const res = yield call(ApiCall, "/api/customer_category/all", "GET");
        yield put(getAllCustomerCategorySuccess(res.data));
    } catch (error) {
    }
}


// get location for client of map
function* workGetAllMapLocation(action) {
    try {
        yield put(getAllLocationsStart());
        const res = yield call(ApiCall, "/api/client/map?cities=" + action.payload, "GET");
        yield put(getAllLocationsSuccess(res.data));
    } catch (error) {
        yield put(getAllLocationsFailure(error.message));
    }
}

// saga
export function* clientSaga() {
    yield takeLatest("client/saveClient", workSaveClient);
    yield takeLatest("client/getAllCustomerCategory", workGetAllCustomerCategory);
    yield takeLatest("client/getAllMap", workGetAllMapLocation);
}
