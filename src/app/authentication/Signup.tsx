import TextField from '@material-ui/core/TextField';
import React from "react";
import Button from '@material-ui/core/Button';
import User from "../../models/user.model";
import AuthAPI from "../../api/auth.api";
import {AuthConstant} from "./Auth.constant";

type SignupProp = {
    classes: any,
    value: number,
    index: number,
    alertCaller: (title: string, message: string) => void
}

export default function Signup(props: SignupProp) {
    const { value, index, alertCaller, classes } = props;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [familyName, setFamilyName] = React.useState("");
    const formRef = React.useRef(null);

    const handleChange = (event: any) => {
        let name = event.target.name;
        if (name === AuthConstant.emailInput) {
            setEmail(event.target.value)
        } else if (name === AuthConstant.passwordInput) {
            setPassword(event.target.value)
        } else if (name === AuthConstant.firstNameInput) {
            setFirstName(event.target.value)
        } else if (name === AuthConstant.familyNameInput) {
            setFamilyName(event.target.value)
        }
    }

    const submitSignup = () => {
        if (email === null || email === "" || password === null || password === ""
        || firstName === null || firstName === "" || familyName === null || familyName === "") {
            alertCaller("Error", "Invalid input!")
            return
        }

        let user = User.createNewUser(email, password, firstName, familyName);
        AuthAPI.signup(user, (data: any) => {
            if (data.user !== undefined) {
                console.log(data.user);
                // @ts-ignore
                formRef.current.reset();
                alertCaller("Info", "Signup successfully!");
            } else{
                alertCaller("Error", data.err)
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
                <TextField onChange={handleChange} name={AuthConstant.familyNameInput} fullWidth margin="normal" id="signup-familyName" label="Family Name" />
                <TextField onChange={handleChange} name={AuthConstant.firstNameInput} fullWidth margin="normal" id="signup-firstName" label="First Name" />
                <TextField onChange={handleChange} name={AuthConstant.emailInput} fullWidth margin="normal" id="signup-email" label="Email" />
                <TextField type={"password"} onChange={handleChange} name={AuthConstant.passwordInput} fullWidth margin="normal" id="signup-password" label="Password" />
                <Button onClick={submitSignup} className={classes.submitBtn} variant="outlined" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
}
