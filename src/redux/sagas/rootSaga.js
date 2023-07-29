import { all, fork } from "redux-saga/effects";
import { login } from "../sagas/LoginSaga";
import PhoneAndDateSaga from "../sagas/PhoneAndDateSaga";

export function* rootSaga() {
  yield all([fork(login, PhoneAndDateSaga)]);
}
