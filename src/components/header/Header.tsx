import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import {HeaderStyles} from "./Header.styles";

function Header() {
    const classes = HeaderStyles();

    return (
        <AppBar elevation={0} className={classes.header} position="static">
            <Toolbar>
                <Box>
                    <img width="180px" height="80px" src="https://petro.wovodat.org/assets/img/EOS.png"/>
                </Box>
                <Box className={classes.webTitle}>
                    <Box>
                        Petrology Workspace and Database
                    </Box>
                    <Box>
                        (PWD)
                    </Box>
                </Box>
                <Box className={classes.ntuImg}>
                    <img width="180px" height="70px" src="https://petro.wovodat.org/assets/img/ntu.png"/>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
