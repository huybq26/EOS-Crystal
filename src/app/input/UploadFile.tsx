import React, { ChangeEvent } from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { excelToJson } from "../../utils/ExcelToJson";

const useStyles = makeStyles({
    fileName: {
        marginLeft: "10px",
        alignSelf: "center",
        textOverflow: "ellipsis"
    },
    spacing: {
        margin: "5px"
    },
    preview: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        maxWidth: "800px"
    }
})

type UploadFileProps = {
    step: number,
    activeStep: number,
    excelFile: File | null,
    excelFileChange: (excelFile: File | null) => any,
}


export default function UploadFile(props: UploadFileProps) {
    const classes = useStyles();
    const { step, activeStep, excelFile } = props;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] != null) {
            props.excelFileChange(e.target.files[0]);
        }
    };

    return (
        <div style={activeStep === step ? { display: "block" } : { display: "none" }}>
            <Box className={classes.spacing} display="flex">
                <Button variant="contained" component="label">
                    Choose File
                    <input onChange={handleFileChange} type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden />
                </Button>

                <Typography className={classes.fileName}
                    component={"p"}>{excelFile != null ? excelFile.name : "Select excel file to upload"}</Typography>
            </Box>
        </div>
    )
}