import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginFailure,
  loginSuccess,
  loginUserStart,
  getSupportPhoneSuccess,
} from "../reducers/LoginSlice";
import ApiCall from "../../../API/ApiCall";



function* loginUserAsync(action) {
  try {
    yield put(loginUserStart());
    const response = yield call(ApiCall, "/api/auth/login/public", "POST", {
      phone: action.payload.phoneNumber,
      password: action.payload.password,
      remember_me: action.payload.remember_me,
    });

    if (response === undefined) {
    } else {
      localStorage.setItem("access_token", response?.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response?.data.refresh_token);
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.setItem("rememberMe", false);
      }
      yield put(loginSuccess(response.data));
    }

  } catch (error) {
  if (error.response.status===406) {
    yield put(loginFailure("Login or password wrong"));
  }
  }
}

function* watchGetSupportPhone() {
  try {
    const response = yield call(ApiCall, "/api/company/support_phone/public", "GET");
    yield put(getSupportPhoneSuccess(response.data));
  } catch (error) {
    console.log(error.message);
  }
}


export function* login() {
  yield takeLatest("user/loginUser", loginUserAsync);
  yield takeLatest("user/getSupportPhone", watchGetSupportPhone);
}
