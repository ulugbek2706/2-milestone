import {call, takeLatest, put} from "redux-saga/effects"
import ApiCall from "API/ApiCall";
import {
    getTerritoriesFailure,
    getTerritoriesStart,
    getTerritoriesSuccess
} from "components/clientOnMap/reducers/clientOnMapSlice";
import {toast} from "react-toastify";


// get all territories for clients of the map page
function* workGetAllTerritories() {

    try {
        yield put(getTerritoriesStart());
        const res = yield call(ApiCall, "/api/territory/map", "GET");
        yield put(getTerritoriesSuccess(res.data));
    } catch (error) {
        yield put(getTerritoriesFailure(error.message));
        toast.error(error.message)
    }
}


export function* clientonmapSaga() {
    yield takeLatest("clientonmap/getAllTerritories", workGetAllTerritories);

}