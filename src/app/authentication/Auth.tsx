import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from "./Login";
import Signup from "./Signup";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from "../../components/alert/Alert";
import {useStyles} from "./Auth.styles";
import ForgetPassword from "./ForgetPassword";


export default function Auth(props: {onClose: any, selectedValue:any, open: boolean}) {
    const classes = useStyles();
    const { onClose, open } = props;
    const [value, setValue] = React.useState(0);
    const [alert, setAlert] = React.useState(false);
    const [alertInfo, setAlertInfo] = React.useState("");
    const [alertTitle, setAlertTitle] = React.useState("");

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const handleAuthClose = () => {
        onClose();
    };

    const closeAlert = () => {
        setAlert(false);
    }

    const alertCaller = (title: string, message: string): void => {
        setAlertInfo(message);
        setAlertTitle(title);
        setAlert(true);
    }

    const a11yProps = (index: number) =>  {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Dialog className={classes.dialog} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="form-dialog-title">Account Authentication</DialogTitle>
            <DialogContent>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" aria-label="simple tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Signup" {...a11yProps(1)} />
                    <Tab label="Forget Password" {...a11yProps(2)} />
                </Tabs>
                <Login value={value} index={0} alertCaller={alertCaller} classes={classes} handleAuthClose={handleAuthClose}/>
                <Signup value={value} index={1} alertCaller={alertCaller} classes={classes}/>
                <ForgetPassword classes={classes} value={value} index={2} alertCaller={alertCaller}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAuthClose} color="primary">
                    Close
                </Button>
            </DialogActions>
            <Alert open={alert} title={alertTitle} info={alertInfo} callback={closeAlert} />
        </Dialog>
    );
}

