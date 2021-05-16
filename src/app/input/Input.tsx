import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {InputStyles} from "./Input.styles";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

// import DialogTitle from "@material-ui/core/DialogTitle";
// import Dialog from "@material-ui/core/Dialog";
// import { DialogActions, DialogContent } from "@material-ui/core";
//import FormLabel from '@material-ui/core/FormLabel';

//const classes = InputStyles();
type InfoProp = {
    classes?: any
}
const crystalNameInput  = "crystalName";
const typeOfCrystalInput = false; // to be modified

const authorInput= "authorInput";
const titleInput= "titleInput";
const yearInput= "2000";
const doiInput= "doiInput";

export default function Input(props: InfoProp){
    //const classes = props;
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false
    })
    const [crystalName, setName] = React.useState("");
    const [typeofCrystal, setType]  = React.useState("");
    const [author, setAuthor]  = React.useState("");
    const [title, setTitle]  = React.useState("");
    const [year, setYear]  = React.useState("");
    const [doi, setDOI] = React.useState("");
    const formRef = React.useRef(null);
    const classes = InputStyles();

    const handleChange = (event: any) => {
        let name = event.target.name;
        if (name === crystalNameInput){
            setName(event.target.value);
        } 
        //else if (name === typeOfCrystalInput) {
        //     setType(event.target.value);
        //}
        else if (name === authorInput) {
            setAuthor(event.target.value);
        } else if (name === titleInput) {
            setTitle(event.target.value);
        } else if (name === yearInput) {
            setYear(event.target.value);
        } else if (name === doiInput) {
            setDOI(event.target.value);
        }
    }

    const handleCheckBoxChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }
    return (
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h5" align="center">
                New Crystal Data
            </Typography>
            <Grid container spacing={1}>
        <Grid item sm>
        <FormGroup /* className= {classes.formLabel}*/>
            <TextField onChange={handleChange} name={crystalNameInput} margin="normal"
                id="crystal-name"
                label="Name of Crystal"
                helperText="*Maximum 100 characters">
            </TextField>
            <Typography className={classes.crystalType}>
                Crystal type
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedA}
                        onChange={handleCheckBoxChange}
                        name="checkedA"
                        color="primary"
                    />
                }
            label="R-to-R"
                
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleCheckBoxChange}
                        name="checkedB"
                        color="primary"
                    />
                }
            label="R-to-C"
                
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedC}
                        onChange={handleCheckBoxChange}
                        name="checkedC"
                        color="primary"
                    />
                }
            label="C-to-C"
                
            />
            
            </FormGroup>
                </Grid>
                

            <Grid item sm className = {classes.grid2}>
            <FormGroup>
            <TextField onChange={handleChange} name={authorInput} fullWidth margin="normal"
                id="author-name"
                label="Name of Author">
                
            </TextField>

            <TextField onChange={handleChange} name={titleInput} fullWidth margin="normal"
                id="crystal-name"
                label="Research Title">
                
            </TextField>
            <TextField onChange={handleChange} name={yearInput} fullWidth margin="normal"
                id="year-publish"
                label="Published year">
                
            </TextField>
            <TextField onChange={handleChange} name={doiInput} fullWidth margin="normal"
                id="doi"
                label="Digital Object Identifier">
                
            </TextField>
        
                    </FormGroup>

            <Grid container
                className = {classes.gridBtn}
                direction="row"
                justify="space-between"
                alignItems="center">
            <Grid item >
                <Button className={classes.chooseFiles} variant = "contained" size = "medium">
                    Choose files....
                </Button>
            </Grid>
            <Grid item alignItems='flex-end'>
                <Button className={classes.submitBtn} variant="contained" color="primary">
                    Submit
                </Button>
            </Grid>
        </Grid>
    </Grid>
</Grid>
</Paper>
    );
}

