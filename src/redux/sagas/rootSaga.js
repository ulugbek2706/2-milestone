import {all, fork} from "redux-saga/effects";
import {login} from "pages/login/sagas/LoginSaga";
import DashboardSaga from "components/navbar/sagas/DashboardSaga";
import {territorySaga} from "components/territory/sagas/TerritorySaga";
import {table} from "components/universalTable/sagas/TableSaga";
import {filter} from "components/universalFilter/sagas/FilterSaga";
import {clientSaga} from "components/clients/sagas/ClientSaga";
import {CustomerCategorySaga} from "components/customerCategory/sagas/CustomerCategorySaga"
import {settingsSaga} from "components/settings/sagas/SettingsSaga"
import {companyProfileSaga} from "components/componyProfile/sagas/CompanyProfileSaga"
import {clientonmapSaga} from "components/clientOnMap/sagas/clientOnMapSaga";
import {webappSaga} from "components/web-app/sagas/webAppSaga";

export function* rootSaga() {
    yield all([
        fork(login),
        fork(DashboardSaga),
        fork(territorySaga),
        fork(table),
        fork(filter),
        fork(clientSaga),
        fork(CustomerCategorySaga),
        fork(settingsSaga),
        fork(companyProfileSaga),
        fork(clientonmapSaga),
        fork(webappSaga)
    ]);
}
