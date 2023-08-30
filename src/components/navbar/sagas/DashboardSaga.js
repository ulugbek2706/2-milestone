import { takeEvery, put, call } from "redux-saga/effects";
import ApiCall from "API/Apicall";
import {getPhoneAndNumberSuccess} from "components/navbar/reducers/DashboardSlice";


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
