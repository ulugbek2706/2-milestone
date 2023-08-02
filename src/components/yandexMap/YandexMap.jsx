import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLatitude,setLongitude} from "../../redux/slices/Territory/TerritorySlice";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  GeolocationControl,
  TrafficControl,
  ZoomControl,
  TypeSelector,
  SearchControl,
} from "react-yandex-maps";

const YandexMap = () => {
  const [template, setTemplate] = useState(null);
  const [mapState, setMapState] = useState([]);
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  const dispatch =useDispatch()
  const {latitude,longitude}=useSelector((state)=>state.territory)

  const handleMapClick = (event) => {
    const coords = event.get("coords");
    const latitude = coords[0];
    const longitude = coords[1];
    dispatch(setLatitude(latitude));
    dispatch(setLongitude(longitude));
    setTemplate([longitude, latitude]);
    setMapState({ center: [latitude, longitude], zoom: 10 });
  };

  const handleClear =()=>{
    dispatch(setLatitude(""));
    dispatch(setLongitude(""))
  }
  return (
    <YMaps
      query={{
        apikey: "9a3bc7b2-bad0-416c-939a-1e4d9298f19c",
        lang: "en_US",
        coordorder: "latlong",
      }}
    >
      <div>
        <Map
          width={500}
          height={500}
          onClick={handleMapClick} // Add the click event listener
          defaultState={{
            center: [39.767966, 64.421728],
            zoom: 6,
          }}
        >
          <Placemark geometry={[latitude, longitude]} />
          <FullscreenControl options={{ float: "left" }} />
          <GeolocationControl options={{ float: "right" }} />
          <TrafficControl options={{ float: "right" }} />
          <ZoomControl options={{ float: "left" }} />
          <TypeSelector options={{ float: "right" }} />
          <SearchControl options={{ float: "left" }} />
        </Map>
      </div>
      <div>
        <div className="flex gap-5">
          <label>
            Lat:
            <input
              disabled
              value={latitude}
              className="block w-[150px] px-1 py-1 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300"
              type="text"
            />
          </label>
          <label>
            Long:
            <input
              disabled
              value={longitude}
              className="block w-[150px] px-1 py-1 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300"
              type="text"
            />
          </label>
        </div>
        <button onClick={handleClear} className="bg-red-500 text-white rounded-md px-5 py-2 my-3">
          Clear
        </button>
      </div>
    </YMaps>
  );
};

export default YandexMap;
