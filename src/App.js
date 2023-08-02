import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Clients from "./components/Clients.jsx";
import Settings from "./components/Settings.jsx";
import Admin from "./components/Admin.jsx";
import Home from "./pages/home/home.js";
import Login from "./pages/login/login.js";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import Territory from "./components/Territory.jsx";
import UModal from "./components/UModal.jsx";

export default function App() {
  const location = useLocation();
  // const { access_token } = useSelector((state) => state.login.accessToken);
  const openPages = [{ path: "/admin", role: ["ADMIN", "SUPER_ADMIN"] }];
  // let token_details = jwtDecode(access_token);

  useEffect(() => {
    let path = location.pathname;
    openPages.forEach((loc) => {
      // check open pages
    });
  }, [location.pathname]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/settings" element={<Settings />} >
          <Route path="/admin/settings/territory" element={<Territory/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
