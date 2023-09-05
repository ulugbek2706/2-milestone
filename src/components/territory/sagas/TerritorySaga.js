import {
    call,
    delay,
    put,
    select,
    takeEvery,
    takeLatest,
} from "redux-saga/effects";
import {toast} from "react-toastify";
import {getTeritoriesSuccess} from "components/clients/reducers/ClientSlice";
import {
    changeCurrentTerritoryItm, getAllTerritorys, getTerritoryFailure,
    getTerritoryStart, getTerritorySuccess,
    resetTerritory
} from "components/territory/reducers/TerritorySlice";
import ApiCall from "API/ApiCall";

function* workSaveTerritory(action) {
    const tableState = yield select((state) => state.table);
    const currentStates = yield select((state) => state.territory);
    try {
        let obj = {
            name: action.payload.name,
            region: action.payload.region,
            active: action.payload.active,
            long: action.payload.longitude,
            lat: action.payload.latitude,
        };
        if (currentStates.currentTerritoryItm !== "") {
            const res = yield call(
                ApiCall,
                "/api/territory/" + currentStates.currentTerritoryItm.id,
                "put",
                obj
            );
            yield put(changeCurrentTerritoryItm(""));
            toast.success("updated successful");
        } else {
            const res = yield call(ApiCall, "/api/territory", "POST", obj);
            toast.success("saved successful");
        }
        yield put(resetTerritory());
        yield call(workGetDataByUrl, {
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
        toast.error(error.message);
    }
}

function* workGetDataByUrl(action) {
    let {pageSize, page, totalElements, active, search, url, param} =
        action.payload;
    try {
        yield put(getTerritoryStart());
        yield delay(1000);
        const res = yield call(
            ApiCall,
            `/api/${url}?page=${page}&size=${
                pageSize === "ALL" ? totalElements : pageSize
            }&active=${active}&search=${search !== undefined ? search : ""}`,
            "GET",
            "",
            param && param
        );
        yield put(getTerritorySuccess(res.data.content));
        yield put(getAllTerritorys(res.data.totalElements));
    } catch (error) {
        yield put(getTerritoryFailure(error.message));
    }
}

// for clients territory select
function* workGetAllTeritory() {
    try {
        const res = yield call(ApiCall, `/api/territory/all`, "GET");
        yield put(getTeritoriesSuccess(res.data));
    } catch (error) {
    }
}

function* workGetExcelFile(action) {
    let {active, search, url, param, columns} = action.payload;
    let colArr = [];
    for (let i = 0; i < columns.length; i++) {
        colArr.push(columns[i].key);
    }
    try {
        const response = yield call(
            ApiCall,
            `/api/${url}/excel?active=${active}&search=${
                search !== undefined ? search : ""
            }&columnNames=${colArr}`,
            "GET",
            "",
            param && param,
            "blob"
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            let path = window.location.pathname;
            a.download = `${path.substring(path.lastIndexOf("/") + 1)}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            console.log("Error downloading excel file: ", response.status);
        }
    } catch (error) {
    }
}

export function* territorySaga() {
    yield takeLatest("territory/saveTerritory", workSaveTerritory);
    yield takeEvery("territory/getTerritory", workGetDataByUrl);
    yield takeEvery("territory/getAllTeritory", workGetAllTeritory);
    yield takeLatest("territory/getExcelFile", workGetExcelFile);
}
