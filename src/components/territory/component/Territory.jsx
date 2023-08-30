import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import YandexMap from "components/yandexMap/YandexMap";
import UniversalTable from "components/universalTable/component/UniversalTable";
import {saveTerritory, setLatitude, setLongitude, setModalVisible} from "components/territory/reducers/TerritorySlice";
import {changeConfirmModalVisible, changeGlobalModalDispatch} from "components/universalModal/reducers/UModalSlice";
import {changeUrl} from "components/universalTable/reducers/tableSlice";
import {useTranslation} from "react-i18next";

const Territory = () => {
  const [t,i18n]=useTranslation("global")
  //
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // territory
  const { modalVisible, longitude, latitude, territory, allTerritorys,isLoading } =
    useSelector((state) => state.territory);


  // table
  const { pageSize, tableActive } = useSelector((state) => state.table);
  const { columnOrderModal } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(changeUrl("territory"));
   
  }, []);


  let column = [
    {
      title: "territory.table.NO",
      key: "id",
      dataType: "number",
      show: true,
    },
    {
      title: "territory.table.name",
      key: "name",
      dataType: "text",
      show: true,
    },
    {
      title: "territory.table.region",
      key: "region",
      dataType: "text",
      show: true,
    },
    {
      title: "territory.table.edit",
      key: "button",
      dataType: "jsx",
      show: true,
      data: (item) => (
        <button
          className="bg-green-500 mx-auto hover:bg-green-600 p-[6px] grid place-items-center rounded-md text-white"
          onClick={() => updateTerritoryHandle(item)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      ),
    },
  ];

  const updateTerritoryHandle = (item) => {
    dispatch(setModalVisible((prev) => !prev));
    dispatch({
      type: "territory/updateTerritory",
      payload: item,
    });
    reset({
      name: item.name,
      region: item.region,
      active: item.active,
      longitude: item.longitude,
      latitude: item.latitude,
    });
    dispatch(setLatitude(item.lat));
    dispatch(setLongitude(item.long));
  };

  const modalRef = useRef(null);

  // get teritories
  useEffect(() => {
    dispatch({
      type: "territory/getTerritory",
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: allTerritorys,
        active: tableActive,
        url: "territory",
      },
    });
  }, []);

  const handleClickModal = () => {
    dispatch(setModalVisible((prev) => !prev));
    reset({
      name: "",
      region: "",
      active: "",
    });
    dispatch(setLatitude(""));
    dispatch(setLongitude(""));
  };

  function addTerritory(data) {
    if (longitude && latitude) {
      const newData = { ...data, longitude: longitude, latitude: latitude };
      dispatch(saveTerritory(newData));
      reset({
        name: "",
        region: "",
        active: "",
      });
      dispatch(setLatitude(""));
      dispatch(setLongitude(""));
      dispatch(setModalVisible(false));
    } else {
      toast.error("you must select location!");
    }
  }

const handleTerritoryRodalBackdrop=()=>{
  dispatch(changeConfirmModalVisible(true))
  dispatch(changeGlobalModalDispatch({type:"territory/setModalVisible",payload:false}))
}

  return (
    <div className="p-1">
      <ToastContainer style={{ zIndex: "10000" }} />
      <div className="">
        <h1 className="font-bold text-3xl">{t("territory.title")}</h1>
        <hr className="mt-1"/> <br />

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClickModal}
          ref={modalRef}
        >
          {t("territory.addButton")}
        </button>

        {modalVisible && (
          <div className=" min-h-[] fixed inset-0 mt-2 flex items-center justify-center  z-[1000]">
            <div
              onClick={handleTerritoryRodalBackdrop}
              className="fixed inset-0 bg-gray-800 opacity-75"
            ></div>
            <div className="bg-white   rounded shadow-lg z-10">
              <h1 className="bg-blue-900 text-white p-3 ">{t("territory.addModal.title")}</h1>

              <div className="relative mt-4 flex gap-10 p-4">
                <div className="flex flex-col ">
                  <form onSubmit={handleSubmit(addTerritory)}>
                    {errors.name && (
                      <span className="text-red-500 mx-16">
                        {errors.name.message}
                      </span>
                    )}
                    <label className="flex items-center gap-1">
                      {t("territory.addModal.name")}:
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="ml-4 block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500"
                        type="text"
                      />
                    </label>
                    {errors.region && (
                      <span className="text-red-500 mx-16">
                        {errors.region.message}
                      </span>
                    )}
                    <label className="flex items-center gap-1">
                      {t("territory.addModal.region")}:
                      <input
                        {...register("region", {
                          required: "Region is required",
                        })}
                        className="ml-2 block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500"
                        type="text"
                      />
                    </label>
                    <label className="flex ">
                      {t("territory.addModal.active")}:
                      <input
                        {...register("active")}
                        className="ml-6 block mt-1 mx-1 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500"
                        type="checkbox"
                      />
                    </label>
                    <div>
                      <button
                        type="submit"
                        className="absolute bottom-[28px] bg-blue-500 hover:bg-blue-700 rounded-md text-white px-4 py-2"
                      >
                        {t("territory.addModal.addButton")}
                      </button>
                    </div>
                  </form>
                </div>
                <div className=" h-[460px] ">
                  <YandexMap place={{ long: longitude, lat: latitude }} />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        )}
        

        <UniversalTable
          data={territory}
          allData={allTerritorys}
          modalChange={columnOrderModal}
          columns={column}
          url={"territory"}
          loading={isLoading}
          locName={"t_order"}
        />
      </div>
    </div>
  );
};

export default Territory;
