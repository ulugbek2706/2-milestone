import React from 'react';
import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark, SearchControl,
    TrafficControl,
    TypeSelector, YMaps,
    ZoomControl
} from "react-yandex-maps";


function WebApp(props) {

    const handleMapClick = () => {

    }

    const handleClear = () => {

    }

    const options = []
    return (
        <div className={"w-full h-screen grid place-items-center"}>
            <div className={"w-1/3 h-[600px] border-2 border-green-600"}>
                <form>
                    <div className={"p-4"}>
                        <div>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Territory</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className={"mt-2"}>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Customer Category</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className={"flex flex-col items-center mt-2"}>
                            <input
                                type='tel'
                                placeholder='phone...'
                                className='border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                            />
                            <input
                                type='text'
                                placeholder='name...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                            />
                            <input
                                type='text'
                                placeholder='Company name...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                            />
                            <input
                                type='text'
                                placeholder='Address...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                            />
                            <input
                                type='text'
                                placeholder='Tin...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                            />
                        </div>
                        <div>
                            <YMaps
                                query={{
                                    apikey: "9a3bc7b2-bad0-416c-939a-1e4d9298f19c",
                                    lang: "en_US",
                                    coordorder: "latlong",
                                }}
                            >
                                <div className="w-full">
                                    <Map
                                        width={510}
                                        height={330}
                                        onClick={handleMapClick} // Add the click event listener
                                        defaultState={{
                                            center: [39.767966, 64.421728],
                                            zoom: 6,
                                        }}
                                    >
                                        {/*<Placemark geometry={[latitude, longitude]}/>*/}
                                        <FullscreenControl options={{float: "left"}}/>
                                        <GeolocationControl options={{float: "right"}}/>
                                        <TrafficControl options={{float: "right"}}/>
                                        <ZoomControl options={{float: "left"}}/>
                                        <TypeSelector options={{float: "right"}}/>
                                        <SearchControl options={{float: "left"}}/>
                                    </Map>
                                </div>
                                <div>
                                    <div className="flex gap-5">
                                        <label>
                                            latitude
                                            <input
                                                disabled
                                                // value={latitude}
                                                className="block w-[150px] px-1 py-1 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300"
                                                type="text"
                                            />
                                        </label>
                                        <label>
                                            longitude
                                            <input
                                                disabled
                                                // value={longitude}
                                                className="block w-[150px] px-1 py-1 mt-2 text-gray-900 placeholder-gray-500 border rounded-lg border-slate-500 focus:ring focus:ring-blue-300"
                                                type="text"
                                            />
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleClear}
                                        className="bg-red-500 hover:bg-red-700 text-white rounded-md px-5 py-2 my-3"
                                    >
                                        clear
                                    </button>
                                </div>
                            </YMaps>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default WebApp;