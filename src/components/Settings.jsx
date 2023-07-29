import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "../store/reducers";
const Settings = ({ plus }) => {    
  useEffect(() => {
    plus();
  }, []);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default connect((state) => state.counter, actions)(Settings);
