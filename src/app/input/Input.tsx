import React from 'react';
import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { InputStyles } from './Input.styles';
import UploadFile from './UploadFile';
import ConfirmData from './ConfirmData';
import { excelToJson } from '../../utils/ExcelToJson';
import _ from 'lodash';

const steps = ['Upload File', 'Confirm Data'];

export default function Input() {
  const classes = InputStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [excelFile, setExcelFile] = React.useState<File | null>(null);
  const [json, setJsonFile] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const onExcelFileChange = (newFile: File | null): void => {
    setExcelFile(newFile);
    if (newFile) {
      excelToJson(newFile).then((data) => {
        setJsonFile(data);
      });
    }
  };

  const handleNext = (): void => {
    setActiveStep(activeStep + 1);
    setSubmitted(true);
  };

  const handleBack = (): void => {
    setActiveStep(activeStep - 1);
    setSubmitted(false);
  };

  const disableNext = (): boolean => {
    if (activeStep == 0 && excelFile == null) {
      return true;
    }

    return false;
  };

  let content = null;

  if (submitted) {
    let jsonFile = JSON.parse(JSON.stringify(json));
    content = (
      <ConfirmData
        mineral={jsonFile['mineral']}
        crystalName={jsonFile['crystal name']}
        volcanoName={jsonFile.volcano}
        eruptionYear={jsonFile.eruption}
        reference={jsonFile.reference}
      />
    );
  }

  return (
    <Paper className={classes.paper}>
      <Typography component='h1' variant='h5' align='center'>
        New Crystal Data
      </Typography>

      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <React.Fragment>
        <div style={{ position: 'relative' }}>
          <UploadFile
            step={0}
            activeStep={activeStep}
            excelFile={excelFile}
            excelFileChange={onExcelFileChange}
          />
        </div>
        {content}
        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
              Back
            </Button>
          )}
          <Button
            variant='contained'
            color='primary'
            onClick={handleNext}
            className={classes.button}
            disabled={disableNext()}
          >
            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
          </Button>
        </div>
      </React.Fragment>
    </Paper>
  );
}
