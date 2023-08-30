import React from 'react';
import logo from "img/logo.jpg";
import {Link} from "react-router-dom";

function Logo(props) {
    return (
        <div>
            <Link to={"/admin"}>
                <img className="w-16 h-16 rounded-full" src={logo} alt="logo" />
            </Link>
        </div>
    );
}

export default Logo;