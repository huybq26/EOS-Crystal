import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {Paper, Typography} from "@material-ui/core";
import {FooterStyles} from "./Footer.styles";
import Button from "@material-ui/core/Button";
import Feedback from "./feedback/Feedback";

function Footer() {
    const classes = FooterStyles();
    const [openFeedback, setOpenFeedback] = React.useState(false);

    const clickFeedback = () => {
        setOpenFeedback(true)
    }

    const closeFeedback = () => {
        setOpenFeedback(false);
    }

    return (
        <Paper elevation={3} className={classes.main}>
            <Toolbar>
                <Typography>Earth Observatory of Singapore</Typography>
                <Button onClick={clickFeedback} className={classes.feedbackBtn}>Feedback</Button>
            </Toolbar>

            <Feedback classes={classes} open={openFeedback} handleClose={closeFeedback}/>
        </Paper>
    )
}

export default Footer;
