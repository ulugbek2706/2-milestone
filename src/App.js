import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Clients from "./components/Clients";
import Settings from "./components/Settings"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/settings" element={<Settings/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
