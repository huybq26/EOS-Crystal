import TextField from '@material-ui/core/TextField';
import React from "react";
import Button from '@material-ui/core/Button';
import {AuthConstant} from "./Auth.constant";
import AuthServices from "./Auth.service";

type LoginProp = {
    classes: any,
    value: number,
    index: number,
    alertCaller: (title: string, message: string) => void,
    handleAuthClose: () => void
}

export default function Login(props: LoginProp) {
    const {value, index, alertCaller, classes, handleAuthClose} = props;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const formRef = React.useRef(null);

    const handleChange = (event: any) => {
        let name = event.target.name;
        if (name === AuthConstant.emailInput) {
            setEmail(event.target.value)
        } else if (name === AuthConstant.passwordInput) {
            setPassword(event.target.value)
        }
    }

    const submitLogin = () => {
        if (email === null || email === "" || password === null || password === "") {
            alertCaller("Error", "Invalid email and password!")
            return
        }

        AuthServices.login(email, password, (status: boolean, msg: string) => {
            if (status) {
                // @ts-ignore
                formRef.current.reset();
                handleAuthClose()
            } else {
                alertCaller("Error", msg);
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
                           id="login-email"
                           label="Email"/>
                <TextField type={"password"} onChange={handleChange} name={AuthConstant.passwordInput} fullWidth
                           margin="normal"
                           id="login-password" label="Password"/>
                <Button onClick={submitLogin} className={classes.submitBtn} variant="outlined" color="primary">
                    Submit
                </Button>
            </form>

        </div>
    );
}
