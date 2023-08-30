import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage} from "./redux/slices/LanguageReducer";

const Language = () => {

    const [t,i18n]=useTranslation("global")
    const dispatch=useDispatch()
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
            <select defaultValue={selectedLanguage} onChange={handleChange}>
                <option value="uzb">UZB</option>
                <option value="eng">ENG</option>
            </select>


            <div>
                <h1>{t("section.title")}</h1>
            </div>
        </div>
    );
}

export default Language;