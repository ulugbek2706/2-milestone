import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getAllDataSuccess,
  getDataFailure,
  getDataStart,
  getDataSuccess
} from "components/universalTable/reducers/tableSlice";

function* watchGetPosts(action) {
  try {
    yield put(getDataStart());
    const response = yield axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${action.payload.mapData.page}&_limit=${action.payload.mapData.pageSize}`
    );
    const responseAll = yield axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    yield put(getDataSuccess(response.data));
    yield put(getAllDataSuccess(responseAll.data));
  } catch (error) {
    yield put(getDataFailure(error.message));
  }
}
function* watchGetFilterData() {}

export function* table() {
  yield takeLatest("table/getPosts", watchGetPosts);
  yield takeLatest("table/handleSearchInpValue", watchGetFilterData);
}
