import TextField from '@material-ui/core/TextField';
import React from "react";
import Button from '@material-ui/core/Button';
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {DialogActions, DialogContent} from "@material-ui/core";

type LoginProp = {
    classes: any,
    open: boolean,
    handleClose: () => void
}

const emailInput = "emailInput";
const titleInput = "titleInput";
const contentInput = "contentInput";


export default function Feedback(props: LoginProp) {
    const {classes, open, handleClose} = props;
    const [email, setEmail] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const formRef = React.useRef(null);

    const handleChange = (event: any) => {
        let name = event.target.name;
        if (name === emailInput) {
            setEmail(event.target.value)
        } else if (name === titleInput) {
            setTitle(event.target.value)
        } else if (name === contentInput) {
            setContent(event.target.value)
        }
    }

    const clickCloseFeedback = () => {
        handleClose()
    }

    return (
        <Dialog className={classes.dialog} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
            <DialogContent>
                <form ref={formRef} noValidate autoComplete="off">
                    <TextField onChange={handleChange} name={emailInput} fullWidth margin="normal"
                               id="feedback-email"
                               label="Email"/>
                    <TextField onChange={handleChange} name={titleInput} fullWidth
                               margin="normal"
                               id="feedback-title" label="Title"/>
                    <TextField onChange={handleChange} name={contentInput} fullWidth
                               margin="normal"
                               multiline
                               rows={5}
                               id="feedback-content" label="Content"/>

                    <Button className={classes.submitBtn} variant="outlined" color="primary">
                        Submit
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={clickCloseFeedback} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
