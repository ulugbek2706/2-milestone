import React, {useCallback, useEffect} from 'react';
import {
    FullscreenControl,
    GeolocationControl,
    Map,
    Placemark, SearchControl,
    TrafficControl,
    TypeSelector, YMaps,
    ZoomControl
} from "react-yandex-maps";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {changeWebConfirmModalVisible, saveWebClient, setWebLocation} from "components/web-app/reducers/webAppSlice";
import {DialogContent} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

let tg = window.Telegram.WebApp;

function WebApp(props) {


    useEffect(() => {
        tg.ready();
    });

    const dispatch = useDispatch()
    const {webLongitude, webLatitude, webConfirmModalVisible, webClient} = useSelector((state) => state.webapp);

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm()

    const handleMapClick = (event) => {
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        dispatch(setWebLocation({latitude, longitude}));
    }


    // save button clicked
    const addClient = (data) => {
        dispatch(changeWebConfirmModalVisible(true))
        const allData = {...data, longitude: webLongitude, latitude: webLatitude};
        dispatch(saveWebClient(allData));
        // send this data to backend
    }

    const options = []

    // cancel button clicked
    const handleCancelData = () => {
        reset()
        dispatch(setWebLocation({longitude: null, latitude: null}));
    }

    // confirm modal close button clicked
    const handleClose = (e, reason) => {
        if (reason === "backdropClick") {
        } else if (reason === "ha") {
            onCheckout()
            dispatch({
                type: "webapp/saveClient",
                payload: webClient
            })
            // tg.close()
            dispatch(changeWebConfirmModalVisible(false))
            // handleCancelData()
        } else {
            dispatch(changeWebConfirmModalVisible(false))
        }
    }

    // web app data send to bot

    const onSendData = useCallback(() => {
        console.log(tg.initDataUnsafe)
        const data = {
            hello: "hello",
            world: "world"
        }
        tg.sendData(JSON.stringify(data))

        // if (queryID) {
        //
        //     // axios({
        //     //     url: "http://localhost:8080/api/webapp",
        //     //     method: "POST",
        //     //     data: {
        //     //         query_id: queryID,
        //     //         data: webClient
        //     //     },
        //     //     headers: {
        //     //         "Content-Type": "application/json"
        //     //     }
        //     // })
        // } else {
        //     tg.sendData(JSON.stringify({title:"hello"}));
        // }
    }, []);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => tg.offEvent('mainButtonClicked', onSendData);
    }, [onSendData]);

    const onCheckout = () => {
        tg.MainButton.text = 'Sotib olish)';
        tg.MainButton.show();
    };


    return (
        <div className={"w-full h-screen grid place-items-center"}>
            <ToastContainer/>
            <div className={"border-2 border-green-600"}>
                <form onSubmit={handleSubmit(addClient)}>
                    <div className={"p-4"}>
                        <div>
                            <select
                                defaultValue={""}
                                {...register("territory")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} disabled>Territory</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div className={"mt-2"}>
                            <select
                                defaultValue={""}
                                {...register("category")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} disabled>Customer Category</option>
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
                                {...register("phone", {required: "Name is required"})}
                            />
                            <input
                                type='text'
                                placeholder='name...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                                {...register("name", {required: "Name is required"})}
                            />
                            <input
                                type='text'
                                placeholder='Company name...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                                {...register("companyName", {required: "Name is required"})}
                            />
                            <input
                                type='text'
                                placeholder='Address...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                                {...register("address", {required: "Name is required"})}
                            />
                            <input
                                type='text'
                                placeholder='Tin...'
                                className='mt-2 border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-2 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]'
                                {...register("tin", {required: "Name is required"})}
                            />
                        </div>
                        <div className={"mt-3 border rounded"}>
                            <YMaps
                                query={{
                                    apikey: "9a3bc7b2-bad0-416c-939a-1e4d9298f19c",
                                    lang: "en_US",
                                    coordorder: "latlong",
                                }}
                            >
                                <div className="w-full">
                                    <Map
                                        width={"auto"}
                                        onClick={handleMapClick} // Add the click event listener
                                        defaultState={{
                                            center: [39.767966, 64.421728],
                                            zoom: 6,
                                        }}
                                    >
                                        <Placemark geometry={[webLatitude, webLongitude]}/>
                                        <FullscreenControl options={{float: "left"}}/>
                                        <GeolocationControl options={{float: "right"}}/>
                                        <TrafficControl options={{float: "right"}}/>
                                        <ZoomControl options={{float: "left"}}/>
                                        <TypeSelector options={{float: "right"}}/>
                                        <SearchControl options={{float: "left"}}/>
                                    </Map>
                                </div>
                            </YMaps>
                            <div className={"flex justify-between items-center mt-2"}>
                                <button
                                    className='inline-flex items-center justify-center rounded-md border border-black py-2 px-8 text-center text-base text-black transition hover:border-black hover:bg-black hover:text-white lg:px-8 xl:px-10'>
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelData}
                                    className='inline-flex items-center justify-center rounded-md border border-black py-2 px-8 text-center text-base text-black transition hover:border-black hover:bg-black hover:text-white lg:px-8 xl:px-10'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Dialog
                open={webConfirmModalVisible}
                onClose={handleClose}
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className="text-center">
                    <h1 className="text-md">Do you really want to save it?</h1>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={(e) => handleClose(e, "yoq")}>
                        no
                    </Button>
                    <Button
                        color="success"
                        onClick={(e) => handleClose(e, "ha")}
                        autoFocus
                    >
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WebApp;