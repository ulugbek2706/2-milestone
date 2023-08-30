import {call,takeEvery} from "redux-saga/effects"
import ApiCall from "API/Apicall";

function* workSetUModalVisible(){
    try {
        const res = yield call(ApiCall,"")
    } catch (error) {
        
    }
}

export function* UModalSaga(){
    yield takeEvery("uModal/setUModalVisible",workSetUModalVisible)
}