import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {setModalClients} from "components/clients/reducers/ClientSlice";
import {setLatitude, setLongitude} from "components/territory/reducers/TerritorySlice";
import {changeConfirmModalVisible, changeGlobalModalDispatch} from "components/universalModal/reducers/UModalSlice";
import ConfirmClose from "components/ConfirmClose";
import {clearMapData} from "components/universalFilter/reducers/filterSlice";

const UniversalRodal = (props) => {
  const { longitude, latitude } = useSelector((state) => state.territory);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (props.url === "client") {
      reset({
        territory: {
          label: props.data.territory,
          value: props.data.territory_id,
        },
        category: { label: props.data.category, value: props.data.category_id },
        name: props.data.name,
        companyName: props.data.company_name,
        address: props.data.address,
        telephone: props.data.phone,
        tin: props.data.tin,
        active: props.data.active,
        longitude: props.data.longitude,
        latitude: props.data.latitude,
        referencePoint: props.data.reference_point,
      });
    } else {
      reset(props.data);
    }
  }, [props.modalChange]);

  const mySubmit = (data) => {
    console.log(data);
    if (props.url === "client") {
      if (longitude && latitude) {
        if (
          data?.territory?.value !== undefined &&
          data?.category?.value !== undefined
        ) {
          dispatch({
            type: `client/saveClient`,
            payload: { ...data, long: longitude, lat: latitude },
          });
          dispatch(setModalClients(false));
          dispatch(setLatitude(""));
          dispatch(setLongitude(""));
          reset();

          // clear select filter value
          props.selectRef.current.forEach((ref) => {
            if (ref) {
              ref.clearValue();
              dispatch(clearMapData());
            }
          });
        } else {
        toast.error("please choose territory and category!");
        }
      } else {
        toast.error("please choose location!");
      }
    }
    if (props.url === "customerCategory") {
      dispatch({
        type: "customerCategory/saveCustomerCategory",
        payload: data,
      });
      dispatch(props.onCloseModal);
    }
  };

  const handleRodalBackdrop = () => {
    dispatch(changeConfirmModalVisible(true));
    dispatch(changeGlobalModalDispatch(props.onCloseModal));
  };

  const handleChange = (e) => {
    console.log("sas");
  };

  return (
    <div>
      <ToastContainer style={{ zIndex: "10000" }} />
      <ConfirmClose closeModal={props.onCloseModal} />
      <div>
        {props.modalChange ? (
          <div className="absolute inset-0  z-[1000]">
            <div className="border-2 border-green-500 grid place-items-center">
              <div
                className={`absolute top-28 w-auto mx-auto ${
                  props.url === "client" ? "max-w-[70rem]" : "max-w-[50rem]"
                }  z-[100]`}
              >
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="flex">
                      <form
                        onSubmit={handleSubmit(mySubmit)}
                        className={`flex  flex-wrap pb-10 ${
                          props.url === "client" ? "w-2/3" : ""
                        } `}
                      >
                        {props.elements.map((item, index) =>
                          item.type === "jsx" ? (
                            <div key={index}>{item.data}</div>
                          ) : (
                            item.type !== "map" && (
                              <div className="mt-[-2px]" key={index}>
                                <label>
                                  {item?.name + ":"}
                                  {item.type === "select" && (
                                    <div className="mr-2 w-[203px]">
                                      <Controller
                                        control={control}
                                        name={item?.key}
                                        rules={{ required: `tanlang iltimos!` }}
                                        render={({ field }) => (
                                          <>
                                            <Select
                                              options={item?.options}
                                              placeholder={item?.defValue}
                                              {...field}
                                            />
                                          </>
                                        )}
                                      />
                                    </div>
                                  )}
                                  {item.type !== "select" &&
                                  item.type !== "map" &&
                                  item.type !== "tel" ? (
                                    <input
                                      className="block px-2 py-2 mr-1 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500"
                                      type={item.type}
                                      placeholder={item.name + "..."}
                                      {...register(
                                        item?.key,
                                        item?.required && {
                                          required: item?.name + " kiriting",
                                        }
                                      )}
                                    />
                                  ) : (
                                    item.type === "tel" && (
                                      <input
                                        className="block px-2 py-2 mr-1 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500"
                                        type={item.type}
                                        placeholder={item.name + "..."}
                                        {...register(
                                          item?.key,
                                          item?.required && {
                                            required: item?.name + " kiriting",
                                            pattern: {
                                              value: /^\+998\d{9}$/,
                                              message: "uzb nomer kiriting!",
                                            },
                                          }
                                        )}
                                      />
                                    )
                                  )}
                                </label>
                                {errors[item?.key]?.message && (
                                  <span className="error-message text-red-700 text-sm">
                                    {errors[item?.key].message}
                                  </span>
                                )}
                              </div>
                            )
                          )
                        )}
                      </form>

                      <div
                        className={`${props.url === "client" ? "w-2/3" : ""}`}
                      >
                        {props.elements?.map((item, index) =>
                          item.type === "map" ? (
                            <div className=" h-[460px]" key={index}>
                              {item.data}
                            </div>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={handleRodalBackdrop}
              className="opacity-25 fixed inset-0 z-40 bg-black"
            ></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UniversalRodal;
