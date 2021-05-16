import TextField from '@material-ui/core/TextField';
import React from "react";
import Button from '@material-ui/core/Button';
import AuthAPI from "../../api/auth.api";
import {AuthConstant} from "./Auth.constant";

type ForgetPasswordProp = {
    classes: any,
    value: number,
    index: number,
    alertCaller: (title: string, message: string) => void,
}

export default function ForgetPassword(props: ForgetPasswordProp) {
    const {value, index, alertCaller, classes} = props;
    const [email, setEmail] = React.useState("");
    const formRef = React.useRef(null);

    const handleChange = (event: any) => {
        let name = event.target.name;
        if (name === AuthConstant.emailInput) {
            setEmail(event.target.value)
        }
    }

    const submitForgetPassword = () => {
        if (email === null || email === "") {
            alertCaller("Error", "Invalid email and password!")
            return
        }

        AuthAPI.forgetPassword(email, (data: any) => {
            if (data.user !== undefined) {
                // @ts-ignore
                formRef.current.reset();
            } else {
                alertCaller("Error", data.err);
            }
        })
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            <form ref={formRef} noValidate autoComplete="off">
                <TextField onChange={handleChange} name={AuthConstant.emailInput} fullWidth margin="normal"
                           id="forget-email"
                           label="Email"/>
                <Button onClick={submitForgetPassword} className={classes.submitBtn} variant="outlined" color="primary">
                    Submit
                </Button>
            </form>

        </div>
    );
}
