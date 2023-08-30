import {  call, put, select, takeLatest } from "redux-saga/effects";


import { toast } from "react-toastify";
import ApiCall from "API/Apicall";
import {changeCurrentCustomerCategory} from "components/customerCategory/reducers/CustomerCategorySlice";

function* workSaveCustomerCategory(action) {
  
  const currentStates = yield select((state) => state.customerCategory);
  const tableState = yield select((state) => state.table);
  const territoryState = yield select((state) => state.territory);

  
  try {
    const obj ={
      name: action.payload.name,
      description: action.payload.description,
      code: action.payload.code,
      active: action.payload.active,
    }
    if(currentStates.currentCustomerCategory!==""){
      const response = yield call(ApiCall, "/api/customer_category/"+currentStates.currentCustomerCategory.id, "PUT",obj );
      toast.success("update successful")
      yield put(changeCurrentCustomerCategory(""))
    }else{
    const response = yield call(ApiCall, "/api/customer_category", "POST",obj );
    toast.success("save successful")

    }

    yield put({type:"territory/getTerritory", 
            payload: {
              pageSize: tableState.pageSize,
              page: tableState.currentPage,
              totalElements: territoryState.allTerritorys,
              active: tableState.tableActive,
              search: tableState.searchInpValue,
              url: tableState.url,
            },
          });
    
  } catch (error) {}
}



export function* CustomerCategorySaga() {
  yield takeLatest(
    "customerCategory/saveCustomerCategory",
    workSaveCustomerCategory
  );
}
