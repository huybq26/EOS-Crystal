import React, {ChangeEvent} from "react";
import Typography from "@material-ui/core/Typography";
import {Box, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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

type UploadParticleImgProps = {
    step: number,
    activeStep: number,
    imgLocalObj: string,
    imgFile: File | null,
    imgChange: (imgLocalObj: string, imgFile: File | null) => any
}

export default function UploadParticleImg(props: UploadParticleImgProps) {
    const classes = useStyles();
    const {imgLocalObj, imgFile, activeStep, step} = props;
    const imgRef = React.useRef<HTMLImageElement>(null);

    const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] != null) {
            let imgSrc = URL.createObjectURL(e.target.files[0]);
            props.imgChange(imgSrc, e.target.files[0]);
        }
    }

    return (
        <div style={activeStep === step ? {display: "block"} : {display: "none"}}>
            <Box className={classes.spacing} display="flex">
                <Button variant="contained" component="label">
                    Choose File
                    <input onChange={imageChange} type="file" accept="image/*" hidden/>
                </Button>

                <Typography className={classes.fileName}
                            component={"p"}>{imgFile != null ? imgFile.name : "Select image to crop background"}</Typography>
            </Box>

            <Typography style={{textAlign: 'center'}} component={"p"}>{imgFile != null ? "Preview" : ""}</Typography>
            <img ref={imgRef} id={"imgId"} className={classes.preview} src={imgLocalObj}/>
        </div>
    )
}
