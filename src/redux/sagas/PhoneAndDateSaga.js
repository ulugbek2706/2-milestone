import axios from "axios";
import { takeEvery } from "redux-saga/effects";
function* getNumberAndDate() {
  const res = yield axios.get("https://localhos:8080/");
  return res.data;
}
function* PhoneAndDateSaga() {
  yield takeEvery("dashboard/getPhoneAndNumberSuccess", getNumberAndDate);
}
export default PhoneAndDateSaga;
