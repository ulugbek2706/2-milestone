import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeConfirmModalVisible} from "./universalModal/reducers/UModalSlice";
import {
    changeCurrentTerritoryItm,
    setLatitude,
    setLongitude,
} from "./territory/reducers/TerritorySlice";
import {updateCurrentClient} from "./clients/reducers/ClientSlice";
import {
    changeCurrentCustomerCategory,
    saveCustomerImgFile,
    saveCustomerImgFileUrl
} from "./customerCategory/reducers/CustomerCategorySlice";
import {useTranslation} from "react-i18next";

const ConfirmClose = () => {
    const [t, i18n] = useTranslation("global")

    const confirmModalVisible = useSelector(
        (state) => state.uModal.confirmModalVisible
    );
    const globalModalDispatch = useSelector(
        (state) => state.uModal.globalModalDispatch
    );
    const {columns} = useSelector((state) => state.table);

    const dispatch = useDispatch();

    useEffect(() => {
    }, [columns, dispatch]);

    const handleClose = (e, reason) => {

        if (reason === "backdropClick") {
            let confirm = window.confirm("Are you sure you want to close")
            console.log(confirm)
        } else if (reason === "ha") {
            dispatch(changeConfirmModalVisible(false));
            dispatch(globalModalDispatch);
            dispatch(setLatitude(""));
            dispatch(setLongitude(""));
            dispatch(updateCurrentClient(""));
            dispatch(changeCurrentCustomerCategory(""));
            dispatch(changeCurrentTerritoryItm(""));
            dispatch(saveCustomerImgFile(null))
            dispatch(saveCustomerImgFileUrl(null))

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
                    {t("confirmClose.title")}
                </DialogTitle>
                <DialogContent className="text-center">
                    <h1 className="text-md text-red-600">{t("confirmClose.description")}</h1>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={(e) => handleClose(e, "yoq")}>
                        {t("confirmClose.no")}
                    </Button>
                    <Button
                        color="success"
                        onClick={(e) => handleClose(e, "ha")}
                        autoFocus
                    >
                        {t("confirmClose.yes")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmClose;
