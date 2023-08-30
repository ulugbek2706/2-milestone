import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Pagination from "@mui/material/Pagination";
import excelIcon from "img/excel.png";
import { useLocation } from "react-router-dom";
import {
  changePageOfSize, changeTableActive, changeVisibleOfColumn, handleSearchInpValue,
  saveColumns,
  saveLocalTest, setColumnOrderModal,
  setCurrentPage, setModalColumns, setTimeOutId
} from "components/universalTable/reducers/tableSlice";
import {getAllTerritorys} from "components/territory/reducers/TerritorySlice";
import UniversalTableModal from "components/universalTableModal";
import UniversalRodal from "components/universalModal/component/UniversalRodal";
import {useTranslation} from "react-i18next";

const UniversalTable = ({ data, columns, allData, url, locName }) => {
  const [t] = useTranslation("global")
  // handle active
  const [isActive, setIsActive] = useState("all");
  const [selectShowValue, setSelectShowValue] = useState([]);


  // dispatch function
  const dispatch = useDispatch();
  const location = useLocation();
  // table initial state
  const {
    pageSize,
    tableActive,
    currentPage,
    searchInpValue,
    timeoutId,
    columnOrderModal,
  } = useSelector((state) => state.table);

  // filter state
  let copyOfColumns = useSelector((state) => state.table.columns);
  const loading = useSelector((state) => state.territory.isLoading);
  const mapData = useSelector((state) => state.filter.mapData);
  let localOrderOfColumns = useSelector(
    (state) => state.table.localOrderOfColumns
  );

  // page refresh

  useEffect(() => {
    dispatch(saveColumns(columns));
    if (!localStorage.getItem(locName)) {
      setDefaultOrderOfcolumns();
    }
    try {
      dispatch(saveLocalTest(JSON.parse(localStorage.getItem(locName))));
    } catch (error) {
      setDefaultOrderOfcolumns();
    }
  }, []);

  // when refresh current page reset default value
  useEffect(() => {
    dispatch(setCurrentPage(1));
    dispatch(changePageOfSize(10));
    dispatch(getAllTerritorys(0));
    dispatch(changeTableActive(""));
    dispatch(handleSearchInpValue(""));
  }, [location.pathname]);

  // save columns from universial table to slice
  useEffect(() => {
    dispatch(setModalColumns(columns));
  }, []);

  const options = [
    { value: -1, label: "ALL" },
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
  ];

  const setDefaultOrderOfcolumns = () => {
    let arr = [];
    for (let i = 0; i < columns.length; i++) {
      arr.push(i);
    }
    localStorage.setItem(locName, JSON.stringify(arr));
  };

  // change data size
  const selectedVal = (e) => {
    dispatch(changePageOfSize(e.value));
    dispatch(setCurrentPage(1));
    dispatch({
      type: `territory/getTerritory`,
      payload: {
        param: mapData,
        pageSize: e.value,
        page: 1,
        totalElements: allData,
        active: tableActive,
        search: searchInpValue,
        url: url,
      },
    });
  };

  // show hide column
  const changeShow = (state, action) => {
    dispatch(
      changeVisibleOfColumn({
        state,
        action,
      })
    );
    setSelectShowValue(state);
  };

  // quick search
  const handleInpValue = (e) => {
    dispatch(setCurrentPage(1));
    clearTimeout(timeoutId);
    dispatch(
      setTimeOutId(
        setTimeout(() => {
          dispatch(handleSearchInpValue(e.target.value));
          dispatch({
            type: `territory/getTerritory`,
            payload: {
              param: mapData,
              pageSize: pageSize,
              page: 1,
              totalElements: allData,
              active: tableActive,
              search: e.target.value,
              url: url,
            },
          });
        }, 800)
      )
    );
  };

  // active no active

  const handleAllActive = () => {
    setIsActive("all");
    dispatch(changeTableActive(""));
    dispatch({
      type: "territory/getTerritory",
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: allData,
        param: mapData,
        active: "",
        search: searchInpValue,
        url: url,
      },
    });
    dispatch(setCurrentPage(1));
  };

  const handleActive = () => {
    setIsActive("active");
    dispatch(changeTableActive(true));
    dispatch({
      type: "territory/getTerritory",
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: allData,
        param: mapData,
        active: true,
        search: searchInpValue,
        url: url,
      },
    });
    dispatch(setCurrentPage(1));
  };
  const handleNoActive = () => {
    setIsActive("noactive");
    dispatch(changeTableActive(false));
    dispatch({
      type: "territory/getTerritory",
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: allData,
        param: mapData,
        active: false,
        search: searchInpValue,
        url: url,
      },
    });
    dispatch(setCurrentPage(1));
  };

  // excel file download

  const getExcelFile = () => {
    let columnsForExcel = JSON.parse(localStorage.getItem(locName)).map(
      (item, index) => copyOfColumns[item]
    );

    columnsForExcel = columnsForExcel.filter(
      (item) => item.show && item.key !== "button"
    );

    dispatch({
      type: `territory/getExcelFile`,
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: allData,
        param: mapData,
        active: tableActive,
        search: searchInpValue,
        url: url === "client/filter" ? "client" : url,
        columns: columnsForExcel,
      },
    });
  };

  return (
    <div className=" my-2 w-full">
      <div>
        {url === "company" ? (
          ""
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleAllActive}
              className={` ${
                isActive === "all" ? "bg-slate-200 text-black" : "bg-white"
              } rounded-md p-2   border hover:bg-gray-100`}
            >
              {t("table.active.all")}
            </button>

            <button
              onClick={handleActive}
              className={` ${
                isActive === "active" ? "bg-slate-200 text-black" : "bg-white"
              } rounded-md p-2   border hover:bg-gray-100`}
            >
              {t("table.active.active")}
            </button>
            <button
              onClick={handleNoActive}
              className={` ${
                isActive === "noactive" ? "bg-slate-200 text-black" : "bg-white"
              } rounded-md p-2   border hover:bg-gray-100`}
            >
              {t("table.active.noActive")}
            </button>
          </div>
        )}

        <div className="flex gap-1 justify-between items-center my-2 ">
          <div className="flex gap-2 items-center w-full my-2">
            <div className="w-[15%]">
              <Select
                defaultValue={pageSize}
                onChange={selectedVal}
                options={options}
                className=""
                placeholder={pageSize}
                isSearchable={false}
              />
            </div>
            <div className="w-1/3">
              <Select
                isSearchable={false}
                value={selectShowValue}
                onChange={changeShow}
                options={columns?.map((col) => ({
                  label: t(col.title),
                  value: col.key,
                }))}
                placeholder={t("table.showHideColumns")}
                isMulti
              />
            </div>
            <div className="mx-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 hover:text-white p-2 rounded-md opacity-80"
                onClick={() => dispatch(setColumnOrderModal(true))}
              >
                {t("table.columnOrder")}
              </button>
              <UniversalRodal
                modalChange={columnOrderModal}
                onCloseModal={setColumnOrderModal(false)}
                elements={[
                  {
                    data: <UniversalTableModal locName={locName} />,
                    type: "jsx",
                  },
                ]}
              />
            </div>

            <div className="">
              <button
                onClick={getExcelFile}
                className="flex gap-1 hover:bg-stone-100 rounded-md p-2 px-3 border"
              >
                <img width={24} src={excelIcon} alt="excel" />{" "}
                <span>excel</span>
              </button>
            </div>
          </div>
          <div>
            <input
              type="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              placeholder={t("table.search")}
              required
              onChange={handleInpValue}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="relative">
          <div className="mx-auto absolute left-[50%]">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <table className=" text-center text-sm font-light w-full rounded-md">
              <thead className="border-b border bg-gray-200 text-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  {(Array.isArray(localOrderOfColumns) &&
                  localOrderOfColumns &&
                  localOrderOfColumns.length > 0
                    ? localOrderOfColumns.map(
                        (ordCol) =>
                          copyOfColumns[
                            Number.isInteger(ordCol) ? ordCol : { show: false }
                          ]
                      )
                    : copyOfColumns
                  )
                    .filter((item) => item?.show)
                    ?.map((item, index) => (
                      <th
                        className="px-4 py-2 bg-gray-200 text-black"
                        key={index}
                      >
                        {t(item.title)}
                      </th>
                    ))}
                </tr>
              </thead>

              {data.length !== 0 ? (
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr
                        className={`border-b border hover:bg-gray-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } dark:border-neutral-500 dark:bg-neutral-700`}
                        key={item.id}
                      >
                        {(Array.isArray(localOrderOfColumns) &&
                        localOrderOfColumns &&
                        localOrderOfColumns.length > 0
                          ? localOrderOfColumns.map(
                              (ordCol) =>
                                copyOfColumns[
                                  Number.isInteger(ordCol)
                                    ? ordCol
                                    : { show: false }
                                ]
                            )
                          : copyOfColumns
                        )
                          .filter((item) => item?.show)
                          ?.map((col) =>
                            col.dataType === "jsx" ? (
                              <td className="" key={col.key}>
                                {col.data ? col.data(item) : ""}
                              </td>
                            ) : (
                              <td
                                key={col.key}
                                className=" px-4 py-2 font-medium border border-gray-200"
                              >
                                {col.key === "id"
                                  ? index + 1 + pageSize * (currentPage - 1)
                                  : item[col.key]}
                              </td>
                            )
                          )}
                      </tr>
                    ))}
                </tbody>
              ) : (
                ""
              )}
            </table>

            {data.length === 0 && (
              <p className="text-center  mt-3 text-lg opacity-70">
                {t("table.noData")}
              </p>
            )}
          </div>

          {data.length !== 0 && (
            <div className="w-full min-h-[30px] flex items-center justify-center p-2 text-white">
              {loading ? (
                <div className="mx-auto">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <Pagination
                  color="success"
                  onChange={(e, page) => {
                    dispatch({
                      type: `territory/getTerritory`,
                      payload: {
                        param: mapData,
                        pageSize,
                        page,
                        totalElements: allData,
                        active: tableActive,
                        search: searchInpValue,
                        url: url,
                      },
                    });
                    dispatch(setCurrentPage(page));
                  }}
                  page={currentPage}
                  count={pageSize < 1 ? 1 : Math.ceil(allData / pageSize)}
                  size="large"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalTable;
