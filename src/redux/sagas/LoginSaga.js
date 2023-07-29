import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  loginFailure,
  loginSuccess,
  loginUserStart,
  getSupportPhoneSuccess,
  getToken,
} from "../slices/login/LoginSlice";

function* loginUserAsync(action) {
  try {
    yield put(loginUserStart());
    const response = yield axios.post(
      "https://cruel-hoops-lie.loca.lt//api/auth/login",
      {
        phone: action.payload.phoneNumber,
        password: action.payload.password,
        remember_me: action.payload.remember_me,
      }
    );

    localStorage.setItem("auth", JSON.stringify(response.data));
    // localStorage.setItem("accessToken", response.data.access_token);
    yield put(loginSuccess(response.data));
    yield put(getToken(response.data));
  } catch (error) {
    yield put(
      loginFailure(
        error.response.status === 401 ? "Login yoki parol xato" : error.message
      )
    );
  }
}

function* watchGetSupportPhone() {
  try {
    const response = yield axios.get(
      "https://cruel-hoops-lie.loca.lt//api/company/support_phone"
    );
    yield put(getSupportPhoneSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* login() {
  yield takeLatest("user/loginUser", loginUserAsync);
  yield takeLatest("user/getSupportPhone", watchGetSupportPhone);
}
