import { put, takeEvery } from "redux-saga/effects";
import { getSettingsSuccess } from "../reducers/SettingsSlice";
import ApiCall from "API/Apicall";

function* workGetSettings() {
  try {
    const response = yield ApiCall("/api/settings", "GET");
    yield put(getSettingsSuccess(response.data));
  } catch (error) {}
}

export function* settingsSaga() {
  yield takeEvery("settings/getSettings", workGetSettings);
}
