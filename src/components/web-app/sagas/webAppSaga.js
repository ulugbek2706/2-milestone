import {put, takeEvery} from "redux-saga/effects";

function* workSaveWebClient(action) {
    console.log(action.payload)
}

export function* webappSaga() {
    yield takeEvery("webapp/saveClient", workSaveWebClient);
}
