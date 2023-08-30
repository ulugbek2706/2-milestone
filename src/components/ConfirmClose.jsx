import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeConfirmModalVisible } from "./universalModal/reducers/UModalSlice";
import {
  changeCurrentTerritoryItm,
  setLatitude,
  setLongitude,
} from "./territory/reducers/TerritorySlice";
import { updateCurrentClient } from "./clients/reducers/ClientSlice";
import { changeCurrentCustomerCategory } from "./customerCategory/reducers/CustomerCategorySlice";

const ConfirmClose = () => {
  const confirmModalVisible = useSelector(
    (state) => state.uModal.confirmModalVisible
  );
  const globalModalDispatch = useSelector(
    (state) => state.uModal.globalModalDispatch
  );
  const { columns } = useSelector((state) => state.table);

  const dispatch = useDispatch();

  useEffect(() => {
  }, [columns, dispatch]);

  const handleClose = (e, reason) => {
    if (reason === "backdropClick") {
    } else if (reason === "ha") {
      dispatch(changeConfirmModalVisible(false));
      dispatch(globalModalDispatch);
      dispatch(setLatitude(""));
      dispatch(setLongitude(""));
      dispatch(updateCurrentClient(""));
      dispatch(changeCurrentCustomerCategory(""));
      dispatch(changeCurrentTerritoryItm(""));
    } else {
      dispatch(changeConfirmModalVisible(false));
    }
  };

  return (
    <div>
      <Dialog
        open={confirmModalVisible}
        onClose={handleClose}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to leave?"}
        </DialogTitle>
        <DialogContent className="text-center">
          <h1 className="text-md text-red-600">(* changes will be deleted!)</h1>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={(e) => handleClose(e, "yoq")}>
            no
          </Button>
          <Button
            color="success"
            onClick={(e) => handleClose(e, "ha")}
            autoFocus
          >
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmClose;
