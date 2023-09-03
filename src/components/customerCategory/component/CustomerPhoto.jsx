import React from 'react';
import {
    saveCustomerImgFile,
    saveCustomerImgFileUrl,
    setCurrentSelectedImage
} from "components/customerCategory/reducers/CustomerCategorySlice";
import {useDispatch, useSelector} from "react-redux";
import logo from "../images/logo.png"
import {Chip, Divider} from "@mui/material";

function CustomerPhoto(props) {
    const dispatch = useDispatch()
    const {imgFileUrl, imgFile, photos, currentSelectedImage} = useSelector((state) => state.customerCategory);

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            dispatch(saveCustomerImgFile(file))
            const imageUrl = URL.createObjectURL(file);
            dispatch(saveCustomerImgFileUrl(imageUrl))
        }
    }
    const handleImageClick = (item) => {
        dispatch(setCurrentSelectedImage(item))
    }

    return (
        <div className={"border border-gray-200 rounded-md mt-3 md:w-[200%]"}>
            <div className="p-2 flex items-center gap-8 justify-between">
                <label
                    className="w-52 flex flex-col items-center px-4 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                    </svg>
                    <span className="mt-2 text-base leading-normal">choose img</span>
                    <input
                        onChange={handleFileChange}
                        className="hidden"
                        type="file"/>
                </label>
                <img className={"w-[70px] h-[70px] rounded-[50%] mt-2"} src={imgFileUrl === null ? logo : imgFileUrl}
                     alt="logo"/>
            </div>

            <Divider>
                <Chip label="RECOMMENDED"/>
            </Divider>

            <div
                className={" mt-3 border-gray-100 rounded min-h-[60px] flex items-center justify-between gap-2 py-2 px-1"}>
                {
                    photos?.map((item, index) => (
                        <div key={index} onClick={() => handleImageClick(item)}
                             className={`border cursor-pointer px-1 border-gray-300 rounded ${currentSelectedImage === item ? 'bg-gray-200' : ''}`}>
                            <img
                                className={`w-[60px] h-[60px] rounded-[50%] mt-2 hover:scale-110 duration-200 ${currentSelectedImage === item ? 'scale-110' : ''}`}
                                src={`http://localhost:8080/api/attachment/${item}/public`}
                                alt="logo"/>
                        </div>

                    ))
                }
            </div>
        </div>
    );
}

export default CustomerPhoto;