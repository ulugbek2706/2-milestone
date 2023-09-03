import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
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
import Select from "react-select";
import Loading from "components/loading/loading";
import {useTranslation} from "react-i18next";
import BalloonMap from "components/clientOnMap/component/balloonMap";
import ReactDOMServer from 'react-dom/server';


export default function ClientOnMap() {
    const dispatch = useDispatch();

    const allLocation = useSelector((state) => state.client.allLocations);
    const allTerritories = useSelector((state) => state.clientonmap.territories);
    const loading = useSelector((state) => state.client.isLoading);
    const [t] = useTranslation("global")


// get all clients locations
    useEffect(() => {
        dispatch({
            type: "client/getAllMap",
            payload: "",
        });
    }, []);

    //get all territories for clientonmap
    useEffect(() => {
        dispatch({
            type: "clientonmap/getAllTerritories",
            payload: null,
        });
    }, []);

    // filter select options
    const options = [{label: "All", value: ""}].concat(
        allTerritories?.map((item) => ({
            label: item.name,
            value: item.id,
        })))


    // handle filter onchange
    const handleFilter = (valueArr) => {
        let multiArr = [];
        for (let i = 0; i < valueArr.length; i++) {
            multiArr.push(valueArr[i]?.value);
        }
        dispatch({
            type: "client/getAllMap",
            payload: multiArr.join(","),
        })
    };


    return (
        <div>
            <div className="flex w-full">
                <div className="w-1/5">
                    <div className="bg-gray-200 h-[100vh] flex flex-col items-center">
                        <div className="bg-orange-500 w-[92%] p-4 text-center mt-1">
                            <h2 className="text-white font-bold">{t("clientsOnMap.title")}</h2>
                        </div>

                        <div
                            className={`bg-blue-400 text-white   p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
                        >{t("clientsOnMap.agent")}</div>
                        <div
                            className={`bg-blue-400 text-white   p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
                        >{t("clientsOnMap.filter")}</div>
                        <div
                            className={`bg-blue-400 text-white   p-2 text-center w-[92%] my-1 cursor-pointer hover:bg-blue-700  transform  transition-all duration-300`}
                        >{t("clientsOnMap.map")}</div>
                    </div>
                </div>
                <div className=" w-4/5">
                    <div className={"flex items-center gap-3 w-full mt-2"}>
                        <h1 className="font-bold text-3xl px-2">Clients on the map</h1>
                        <Select className={"w-1/3"}
                                options={options}
                                placeholder={" choose Territory"}
                                onChange={handleFilter}
                                isMulti

                        />
                    </div>

                    <hr className="mt-1"/>
                    {
                        loading ? <Loading/> : <div>

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
                                        height={580}

                                        defaultState={{
                                            center: [39.767966, 64.421728],
                                            zoom: 6,
                                        }}
                                    >
                                        {
                                            allLocation?.map((item, index) => (
                                                <Placemark
                                                    key={index}
                                                    geometry={[item.latitude, item.longitude]}
                                                    properties={{
                                                        iconCaption: item.name,
                                                        balloonContent: ReactDOMServer.renderToString(<BalloonMap
                                                            item={item}/>),
                                                    }}
                                                    options={{
                                                        iconImageHref: '../images/agents.png',
                                                        iconImageSize: [52, 52],
                                                        iconShape: {
                                                            type: 'Circle',
                                                            coordinates: [0, 0],
                                                            radius: 20
                                                        },
                                                    }}

                                                    // item?.active ? {} : {iconColor: "red"}
                                                />
                                            ))
                                        }
                                        <FullscreenControl options={{float: "left"}}/>
                                        <GeolocationControl options={{float: "right"}}/>
                                        <TrafficControl options={{float: "right"}}/>
                                        <ZoomControl options={{float: "left"}}/>
                                        <TypeSelector options={{float: "right"}}/>
                                        <SearchControl options={{float: "left"}}/>
                                    </Map>
                                </div>
                            </YMaps>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}
