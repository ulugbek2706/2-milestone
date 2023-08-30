import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import {BrowserRouter} from "react-router-dom";
import "rodal/lib/rodal.css";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import global_uzb from "./language/uz/global.json";
import global_eng from "./language/eng/global.json";
import global_rus from "./language/ru/global.json"

i18next.init({
    interpolation: { escapeValue: false },
    lng: "eng",
    resources: {
        eng: {
            global: global_eng,
        },
        uzb: {
            global: global_uzb,
        },
        rus: {
            global: global_rus,
        },
    },
});

// import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <I18nextProvider i18n={i18next}>
                <App/>
            </I18nextProvider>
        </Provider>
    </BrowserRouter>
);
