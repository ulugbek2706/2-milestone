import React from 'react';
import gps from "img/gps.png";
import question from "img/question.png";
import {useTranslation} from "react-i18next";

function NavbarMenu(props) {

    const [t,i18n]=useTranslation("global")

    return (
        <div>
            <ul className="flex gap-12 text-white font-bold">
                <li className="my-auto cursor-pointer">{t("navBar.supervisor")}</li>
                <li className="my-auto cursor-pointer">{t("navBar.sales")}</li>
                <li className="my-auto cursor-pointer">
                    <select className="bg-gray-600 cursor-pointer" name="" id="">
                        <option value="">{t("navBar.clashRegister")}</option>
                    </select>
                </li>
                <li className="flex my-auto cursor-pointer">
                    <img src={gps} alt="gps" />
                    <select className="bg-gray-600 cursor-pointer" name="" id="">
                        <option value="">GPS</option>
                    </select>
                </li>
                <li className="flex justify-center gap-2 items-center w-40 h-16 rounded-sm cursor-pointer bg-green-500 hover:bg-green-700">
                    <img
                        className="w-10 h-18 bg-white rounded-full"
                        src={question}
                        alt="question"
                    />
                    <p>{t("navBar.help")}</p>
                </li>
            </ul>
        </div>
    );
}

export default NavbarMenu;