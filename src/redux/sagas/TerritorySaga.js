import axios from "axios"
import {takeLatest,call, put} from "redux-saga/effects"
import { resetTerritory } from "../slices/Territory/TerritorySlice"

function* workSaveTerritory(action){
    try {
        const res = yield call(axios.post("https://localhost:",{
            name:action.payload.name,
            region:action.payload.region,
            active:action.payload.active
        }))
        yield put(resetTerritory())
    } catch (error) {
        
    }
}

export function* territorySaga(){
    yield takeLatest('territory/saveTerritory',workSaveTerritory)
}