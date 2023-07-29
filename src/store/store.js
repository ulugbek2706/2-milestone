import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import DashboardReducer from "./reducers";
import PhoneAndDateSaga from "../sagas/PhoneAndDateSaga";
const sagaMiddleWare = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(PhoneAndDateSaga)]);
}

const store = configureStore({
  reducer: {
    dashboard: DashboardReducer,
  },
  middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(rootSaga);

export default store;
