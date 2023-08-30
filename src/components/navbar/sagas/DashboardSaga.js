import { takeEvery, put, call } from "redux-saga/effects";
import {getPhoneAndNumberSuccess} from "components/navbar/reducers/DashboardSlice";
import ApiCall from "../../../API/ApiCall";


function* watchGetNumberAndDate() {
  try {
    const res = yield call(ApiCall, "/api/user/dashboard", "GET");
    yield put(getPhoneAndNumberSuccess(res.data));
  } catch (error) {
    // Handle errors if needed
  }
}

function* DashboardSaga() {
  yield takeEvery("dashboard/fetchPhoneAndNumber", watchGetNumberAndDate);
}

export default DashboardSaga;
