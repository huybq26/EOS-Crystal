import React, { ChangeEvent } from 'react';
import {
  Button,
  Typography,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const crystalNameInput = 'crystalName';
const mineralNameInput = 'mineralName';
const volcanoNameInput = 'volcanoName';
const eruptionYearInput = 'eruptionYear';
const referenceInput = 'referenceInput';
const typeOfCrystalInput = false; // to be modified

const authorInput = 'authorInput';
const titleInput = 'titleInput';
const yearInput = '2000';
const doiInput = 'doiInput';

const useStyles = makeStyles((theme) => ({
  crystalType: {
    marginTop: theme.spacing(5),
  },
  grid2: {
    // marginLeft: theme.spacing(1)
  },
  gridBtn: {
    marginTop: theme.spacing(3),
  },
  chooseFiles: {},
  submitBtn: {
    // marginLeft: theme.spacing(30)
  },
}));

type ConfirmDataProps = {
  mineral: string;
  crystalName: string;
  volcanoName: string;
  eruptionYear: string;
  reference: string;
  crystalType: string;
};

export default function ConfirmData(props: ConfirmDataProps) {
  const {
    mineral,
    crystalName,
    volcanoName,
    eruptionYear,
    reference,
    crystalType,
  } = props;
  //alert(props.mineral);
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: crystalType == 'Rim-to-Rim ' ? true : false,
    checkedB: false,
    checkedC: false,
  });
  const [crystalNameInput, setName] = React.useState('');
  const [mineralNameInput, setMineralNameInput] = React.useState('');
  const [volcanoNameInput, setVolcanoNameInput] = React.useState('');
  const [eruptionYearInput, setEruptionYearInput] = React.useState('');
  const [referenceInput, setReferenceInput] = React.useState('');
  const [typeofCrystal, setType] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [year, setYear] = React.useState('');
  const [doi, setDOI] = React.useState('');
  const formRef = React.useRef(null);

  const handleChange = (event: any) => {
    let name = event.target.name;
    if (name === crystalNameInput) {
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
  };

  const handleCheckBoxChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item sm>
          <FormGroup /* className= {classes.formLabel}*/>
            <TextField
              onChange={handleChange}
              name={crystalNameInput}
              margin='normal'
              id='crystal-name'
              //label='Crystal name'
              helperText='Crystal name'
              placeholder={props.crystalName}
            ></TextField>
            <TextField
              onChange={handleChange}
              name={mineralNameInput}
              margin='normal'
              id='crystal-name'
              //   label='Mineral name'
              helperText='Mineral name'
              placeholder={props.mineral}
            ></TextField>
            <TextField
              onChange={handleChange}
              name={volcanoNameInput}
              margin='normal'
              id='crystal-name'
              //label='Volcano name'
              helperText='Volcano name'
              placeholder={props.volcanoName}
            ></TextField>

            <Typography className={classes.crystalType}>
              Type traverse
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleCheckBoxChange}
                  name='checkedA'
                  color='primary'
                />
              }
              label='R-to-R'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleCheckBoxChange}
                  name='checkedB'
                  color='primary'
                />
              }
              label='R-to-C'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedC}
                  onChange={handleCheckBoxChange}
                  name='checkedC'
                  color='primary'
                />
              }
              label='C-to-C'
            />
          </FormGroup>
        </Grid>

        <Grid item sm className={classes.grid2}>
          <FormGroup>
            <TextField
              // onChange={handleChange}
              // name={eruptionYearInput}
              margin='normal'
              id='crystal-name'
              //label={props.eruptionYear}
              helperText='Eruption year'
              placeholder={props.eruptionYear}
            ></TextField>
            <TextField
              onChange={handleChange}
              name={referenceInput}
              fullWidth
              margin='normal'
              id='author-name'
              //label='Reference'
              helperText='Reference'
              placeholder={props.reference}
            ></TextField>

            <TextField
              onChange={handleChange}
              name={titleInput}
              fullWidth
              margin='normal'
              id='crystal-name'
              label='Research Title'
            ></TextField>
            <TextField
              onChange={handleChange}
              name={yearInput}
              fullWidth
              margin='normal'
              id='year-publish'
              label='Published year'
            ></TextField>
            <TextField
              onChange={handleChange}
              name={doiInput}
              fullWidth
              margin='normal'
              id='doi'
              label='Digital Object Identifier'
            ></TextField>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
}
