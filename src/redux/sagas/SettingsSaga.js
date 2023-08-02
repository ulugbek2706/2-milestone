import axios from "axios"
import {takeLatest, put} from "redux-saga/effects"
import { getSettings } from "../slices/settings/SettingsSlice"

function* workGetSettings(){
    try {
        const response=yield axios.get("https:localhost:")
        yield put(getSettings(response.data))
    } catch (error) {
        
    }
}


export function* settingsSaga(){
    yield takeLatest("settings/getSettings",workGetSettings)
}