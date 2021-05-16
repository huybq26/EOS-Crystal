import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";

export default function Alert(props: { open: boolean, title: string, info: string, callback: any }) {
    const {open, title, info, callback, ...other} = props;

    const handleClose = () => {
        if (callback) {
            callback()
        }
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {info}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export interface AlertCaller {
    (title: string, message: string): void
}
