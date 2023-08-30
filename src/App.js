import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Clients from "./components/clients/component/Clients.jsx";
import Settings from "./components/settings/component/Settings.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./pages/login/login.js";
import Territory from "./components/territory/component/Territory.jsx";
import ComponyProfile from "./components/componyProfile/component/ComponyProfile.jsx";
import CustomerCategory from "./components/customerCategory/component/CustomerCategory.jsx";
import NotFound from "./pages/not found/404.js";
import ClientOnMap from "./components/clientOnMap/component/ClientOnMap.jsx";
import { useState } from "react";

export default function App() {
  let pages = [
    "/",
    "/admin",
    "/admin/clients",
    "/admin/map",
    "/admin/settings",
    "/admin/settings/territory",
    "/admin/settings/company_profile",
    "/admin/settings/customer_category",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // check local storage
  useEffect(() => {
    const checkLocalStorageAndRedirect = () => {
      if (!localStorage.getItem("access_token")) {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    };

    window.addEventListener("load", checkLocalStorageAndRedirect);

    return () => {
      window.removeEventListener("load", checkLocalStorageAndRedirect);
    };
  }, [location.pathname]);


  useEffect(() => {
    if (!pages.includes(location.pathname)) {
      navigate("/404")
    }
  }, [location.pathname]);

  // loading

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate loading delay
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(loadingTimeout);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className={"container-loader"}>
        <div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/map" element={<ClientOnMap />} />
          <Route path="/admin/settings" element={<Settings />}>
            <Route path="/admin/settings/territory" element={<Territory />} />
            <Route
              path="/admin/settings/company_profile"
              element={<ComponyProfile />}
            />
            <Route
              path="/admin/settings/customer_category"
              element={<CustomerCategory />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
