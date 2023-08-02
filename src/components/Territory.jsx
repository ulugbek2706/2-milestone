import React, { useRef, useEffect } from "react";
import YandexMap from "./yandexMap/YandexMap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible,setLatitude,setLongitude } from "../redux/slices/Territory/TerritorySlice";
import { ToastContainer,toast } from "react-toastify";
import UModal from "./UModal";

const Territory = () => {

  const dispatch = useDispatch()
  const {handleSubmit,register,formState:{errors},reset}=useForm()
  const {modalVisible,longitude,latitude} = useSelector((state)=>state.territory)
    const modalRef = useRef(null);
  
  
    const handleClickModal = () => {
      dispatch(setModalVisible((prev)=>!prev))
    };

    function addTerritory(data){

      if(longitude && latitude){
        const newData = {...data, longitude:longitude, latitude:latitude}
        dispatch({type:'territory/saveTerritory',payload:newData})
        reset({
          name:"",
          region:"",
          active:""
        })
        dispatch(setLatitude(""))
        dispatch(setLongitude(""))
        dispatch(setModalVisible(false))
        toast.success("Nice")
        console.log(newData);
      }else{
        toast.error("You must select territory")
      }

      
    }
  return (
    <div>
      <ToastContainer style={{zIndex:"10000"}}/>
      <h1>Territory</h1>
      <div className="">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClickModal}
          ref={modalRef}
        >
          Add Territory
        </button>
        <UModal elements={[
          {
            name:"nimadir",
            key:"nimadir",
            type:"text"
          }
        ]}/>
        {modalVisible && (
          <div className=" fixed inset-0 flex items-center justify-center z-50">
            <div onClick={()=>dispatch(setModalVisible(false))} className="fixed inset-0 bg-gray-800 opacity-75"></div>
            <div className="bg-white  rounded shadow-lg z-10">
            <h1 className="bg-blue-900 text-white p-3 ">Add Territory</h1>

              <div className="relative mt-4 flex gap-10 p-7">
                <div className="flex flex-col ">
                    <form onSubmit={handleSubmit(addTerritory)}>
                    {errors.name && <span className="text-red-500 mx-16">{errors.name.message}</span>}
                    <label className="flex items-center gap-1">
                        Name:
                    <input {...register("name",{required:"Name is required"})} className="ml-4 block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300" type="text" />
                    </label>
                    {errors.region && <span className="text-red-500 mx-16">{errors.region.message}</span>}
                    <label className="flex items-center gap-1">
                        Region:
                    <input {...register("region",{required:"Region is required"})} className="ml-2 block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300" type="text" />
                    </label>
                    <label className="flex ">
                        active:
                    <input {...register("active")} className="ml-6 block mt-1 mx-1 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300" type="checkbox" />
                    </label>
                    <div>
                      <button type="submit" className="absolute top-[610px] bg-blue-500 rounded-md text-white px-4 py-2">Add</button>
                    </div>
                    </form>
                </div>
                <div>
                  <YandexMap/>
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Territory;
