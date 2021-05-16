import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";

export default function Confirm(props: { open: boolean, title: string, info: string, callback:any }) {
    const {open, title, info, callback} = props;

    const handleClick = (value: boolean) => {
        if (callback) {
            callback(value)
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
                <Button onClick={() => handleClick(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleClick(true)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export interface AlertCaller {
    (title: string, message: string): void
}
