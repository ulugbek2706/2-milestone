import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
import { getPhoneAndNumberSuccess } from "../slices/dashboard/DashboardSlice";
function* watchGetNumberAndDate() {
  const res = yield axios.get(
    "https://loud-roses-look.loca.lt/api/user/dashboard"
  );
  console.log(res.data);
  yield put(getPhoneAndNumberSuccess(res.data));
}
function* PhoneAndDateSaga() {
  yield takeEvery("dashboard/getPhoneAndNumberSuccess", watchGetNumberAndDate);
}
export default PhoneAndDateSaga;
