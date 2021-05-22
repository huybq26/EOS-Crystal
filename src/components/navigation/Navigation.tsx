import React, { useCallback, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavigationStyles } from "./Navigation.styles";
import Auth from "../../app/authentication/Auth";
import AuthServices from "../../app/authentication/Auth.service";
import { useHistory } from 'react-router-dom';

export default function Navigation(props: { authenticated: boolean }) {
    const { authenticated } = props;
    const classes = NavigationStyles();
    const [openLogin, setOpenLogin] = useState(false);
    const history = useHistory();

    const handleOnClick = useCallback((url: string) => history.push(url), [history]);

    const openLoginDialog = () => {
        if (!authenticated) {
            setOpenLogin(true)
        } else {
            AuthServices.logout();
        }
    }

    return (
        <AppBar className={classes.header} position="static">
            <Toolbar>
                <Button className={classes.navBtn} color="inherit" onClick={() => handleOnClick("/home")}>Home</Button>
                <Button className={classes.navBtn} color="inherit" onClick={() => handleOnClick("/input")}>Input</Button>

                <Button className={`${classes.navBtn} ${classes.loginBtn}`} onClick={openLoginDialog} color="inherit">
                    {authenticated ? "Logout" : "Login"}
                </Button>
            </Toolbar>

            <Auth onClose={() => {
                setOpenLogin(false)
            }} selectedValue={0} open={openLogin} />

        </AppBar>
    )
}
