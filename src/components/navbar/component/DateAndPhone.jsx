import React, {useEffect} from 'react';
import date from "img/calendar.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhoneAndNumber} from "components/navbar/reducers/DashboardSlice";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "redux/slices/LanguageReducer";
import uzbIcon from "../images/uzb.png"
import rusIcon from "../images/rus.png"
import engIcon from "../images/eng.png"
import {Select, Option} from "@material-tailwind/react";


function DateAndPhone(props) {
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchPhoneAndNumber());
    }, [dispatch]);

    const [t, i18n] = useTranslation("global")
    const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
    }, [selectedLanguage]);

    const handleChange = (e) => {
        console.log(e)
        localStorage.setItem("language", e.target.value)
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div className={"flex item-center gap-2 px-2"}>
            {data && (
                <div className="flex items-center gap-4 text-white">
                    <b className="flex items-center gap-3 bg-blue-500 p-4 hover:bg-blue-700 rounded-sm">
                        <img src={date} alt="date"/>
                        {data.currentDate}
                    </b>
                    <p className="font-bold text-md">{data.supportPhone}</p>
                </div>
            )}
            <div className={"my-auto px-1"}>
                <select className={" block scale-110 w-full rounded-md  shadow-sm focus:border-primary-300 outline-0 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"} defaultValue={selectedLanguage} onChange={handleChange}>
                    <option value="uzb">UZB</option>
                    <option value="eng">ENG</option>
                    <option value="rus">RUS</option>
                </select>

            </div>
        </div>
    );
}

export default DateAndPhone;

// <Menu
//
//     animate={{
//         mount: {y: 0},
//         unmount: {y: 25},
//     }}
// >
//     <MenuHandler>
//         <Button>lang</Button>
//     </MenuHandler>
//     <MenuList >
//         <MenuItem className={"flex items-center gap-2"}>
//             <p>UZB</p>
//             <img
//                 className="h-[5vh] w-auto rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
//                 src={uzbIcon}
//                 alt="uzb"
//                 onChange={handleChange}
//             />
//         </MenuItem>
//         <MenuItem className={"flex items-center gap-2"}>
//             <p>ENG</p>
//             <img
//                 className="h-[5vh] w-auto rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
//                 src={engIcon}
//                 alt="eng"
//             />
//         </MenuItem>
//         <MenuItem className={"flex items-center gap-2"}>
//             <p>RUS</p>
//             <img
//                 className="h-[5vh] w-auto rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
//                 src={rusIcon}
//                 alt="rus"
//             />
//         </MenuItem>
//
//     </MenuList>
// </Menu>