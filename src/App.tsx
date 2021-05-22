import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import { AppStyles } from "./App.styles";
import AuthServices from "./app/authentication/Auth.service";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./app/home/Home";
import Input from "./app/input/Input";
import { InputAdornment } from '@material-ui/core';

function App() {
    const classes = AppStyles();
    const [authStatus, setAuthStatus] = React.useState(false);

    React.useEffect(() => {
        AuthServices.subscribeAuthEvent(status => {
            setAuthStatus(status);
        })

        // fetch profile of users on page render
        AuthServices.fetchProfile();
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <Router>
                <Navigation authenticated={authStatus} />
                <main className={classes.main}>

                    <Switch>
                        <Route path={"/input"}>
                            <Input />
                        </Route>
                        <Route path={"/"}>
                            <Home />
                        </Route>
                    </Switch>

                </main>
            </Router>
            <Footer />
        </React.Fragment>
    );
}

export default App;
