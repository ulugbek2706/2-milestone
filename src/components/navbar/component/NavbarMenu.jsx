import React from 'react';
import gps from "img/gps.png";
import question from "img/question.png";

function NavbarMenu(props) {
    return (
        <div>
            <ul className="flex gap-12 text-white font-bold">
                <li className="my-auto cursor-pointer">Supervisor</li>
                <li className="my-auto cursor-pointer">Sales</li>
                <li className="my-auto cursor-pointer">
                    <select className="bg-gray-600 cursor-pointer" name="" id="">
                        <option value="">Clash register</option>
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
                    <p>Online Help</p>
                </li>
            </ul>
        </div>
    );
}

export default NavbarMenu;