import { all, fork } from "redux-saga/effects";
import { login } from "../sagas/LoginSaga";
import DashboarSaga from "../sagas/DashboardSaga";

export function* rootSaga() {
  yield all([fork(login,DashboarSaga )]);
}
