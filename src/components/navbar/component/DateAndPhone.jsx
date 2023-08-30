import React, {useEffect} from 'react';
import date from "img/calendar.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhoneAndNumber} from "components/navbar/reducers/DashboardSlice";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../../redux/slices/LanguageReducer";

function DateAndPhone(props) {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchPhoneAndNumber());
    }, [dispatch]);

    const [t,i18n]=useTranslation("global")
    const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
    }, [selectedLanguage]);

    const handleChange =(e)=>{
        localStorage.setItem("language",e.target.value)
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div>
            {data && (
                <div className="flex items-center gap-4 text-white">
                    <b className="flex items-center gap-3 bg-blue-500 p-4 hover:bg-blue-700 rounded-sm">
                        <img src={date} alt="date" />
                        {data.currentDate}
                    </b>
                    <p className="font-bold text-md">{data.supportPhone}</p>
                </div>
            )}
            <div>
                <select defaultValue={selectedLanguage} onChange={handleChange}>
                    <option value="uzb">UZB</option>
                    <option value="eng">ENG</option>
                    <option value="rus">RUS</option>
                </select>
            </div>
        </div>
    );
}

export default DateAndPhone;