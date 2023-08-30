import { call, put, takeLatest } from "redux-saga/effects";
import {getDataFailure, getDataStart, getDataSuccess} from "components/universalTable/reducers/tableSlice";
import ApiCall from "../../../API/ApiCall";

// fake backend tested
function* watchGetData() {
  try {
    yield put(getDataStart());
    const response = yield call(ApiCall,"https://jsonplaceholder.typicode.com/todos","GET");
    yield put(getDataSuccess(response.data));
  } catch (error) {
    yield put(getDataFailure(error.message));
  }
}

function* watchSendAxiosRequestParam(action) {
  try {
    const response = yield call(ApiCall,"https://jsonplaceholder.typicode.com/comments","GET",null,{
      params: action.payload,
    });
    yield put(getDataSuccess(response.data));
  } catch (error) {
    yield put(getDataFailure(error.message));
  }
}

export function* filter() {
  yield takeLatest("filter/getData", watchGetData);
  yield takeLatest("filter/sendUrl", watchSendAxiosRequestParam);
}
