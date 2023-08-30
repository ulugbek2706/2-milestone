import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {setCurrentPage} from "components/universalTable/reducers/tableSlice";
import {saveFilterMap, sendFilterAxiosUrl} from "components/universalFilter/reducers/filterSlice";

const UniversalFilter = ({
  columns,
  url,
  pageSize,
  pagination,
  active,
  selectRef,
}) => {
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.filter.mapData);
  const searchInpValue = useSelector((state) => state.table.searchInpValue);

  const showFilter = () => {
    let reuqestParamObj = mapData;
    if (Object.values(reuqestParamObj).length === 0) {
      alert("choose filter!");
    } else {
      dispatch({
        type: "territory/getTerritory",
        payload: {
          pageSize: pageSize,
          page: 1,
          totalElements: pagination,
          active: active,
          url: url,
          param: reuqestParamObj,
          search: searchInpValue,
        },
      });
      dispatch(sendFilterAxiosUrl(reuqestParamObj));
      // new added 
      dispatch(setCurrentPage(1));
    }
  };

  const handleChange = (valueArr, action, urlValue) => {
    let multiArr = [];
    if (Array.isArray(valueArr)) {
      for (let i = 0; i < valueArr.length; i++) {
        multiArr.push(valueArr[i]?.value);
      }
      dispatch(saveFilterMap({ title: urlValue, value: multiArr.join(",") }));
    } else {
      dispatch(saveFilterMap({ title: urlValue, value: valueArr?.value }));
    }
  };

  return (
    <div className=" py-2">
      <div className="border-1 w-full grid grid-cols-4">
        {columns?.map((col, index) => (
          <Select
            ref={(ref) => (selectRef.current[index] = ref)}
            key={index}
            onChange={(state, action) =>
              handleChange(state, action, col.urlValue)
            }
            className=" my-2 w-2/3  text-gray-900 text-sm rounded-lg block "
            placeholder={col.defaultValue}
            isDisabled={col?.values?.value}
            options={col?.dataType === "opt" ? col?.values : col?.values}
            isMulti={col.dataType === "multi" || col.dataType === "opt"}
          />
        ))}
        <button
          onClick={showFilter}
          className="w-[80px] my-2 h-[40px] cursor-pointer  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default UniversalFilter;
