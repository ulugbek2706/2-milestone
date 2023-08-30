import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  SearchControl,
  TrafficControl,
  TypeSelector,
  YMaps,
  ZoomControl,
} from "react-yandex-maps";

export default function ClientOnMap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "client/getAllMap",
      payload: null,
    });
  }, []);

  const allLocation = useSelector((state) => state.client.allLocations);





  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/5">
          <div className="bg-gray-200 h-[100vh] flex flex-col items-center">
            <div className="bg-orange-500 w-[92%] p-4 text-center mt-1">
              <h2 className="text-white font-bold">Clients of map</h2>
            </div>

            <div
              className={`bg-blue-400 text-white   p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
            >Agent</div>
            <div
              className={`bg-blue-400 text-white   p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
            >Filter</div>
            <div
              className={`bg-blue-400 text-white   p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
            >Map</div>
          </div>
        </div>
        <div className=" w-4/5">
          {/*  */}
          <YMaps
            query={{
              apikey: "9a3bc7b2-bad0-416c-939a-1e4d9298f19c",
              lang: "en_US",
              coordorder: "latlong",
            }}
          >
            <div className="p-2">
              <Map
                width={980}
                height={640}
                
                defaultState={{
                  center: [39.767966, 64.421728],
                  zoom: 6,
                }}
              >
                {allLocation?.map((item, index) => (
                  <Placemark
                    key={index}
                    geometry={[item.latitude, item.longitude]}
                    properties={{
                      iconCaption: item.name,
                      balloonContent: item.address,
                    }}
                    options={item?.active?{}:{iconColor:"red"}}
                  />
                ))}
                <FullscreenControl options={{ float: "left" }} />
                <GeolocationControl options={{ float: "right" }} />
                <TrafficControl options={{ float: "right" }} />
                <ZoomControl options={{ float: "left" }} />
                <TypeSelector options={{ float: "right" }} />
                <SearchControl options={{ float: "left" }} />
              </Map>
            </div>
          </YMaps>

          {/*  */}
        </div>
      </div>
    </div>
  );
}
