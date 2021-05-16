import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";
import {ImageToolsStyles} from "./ImageTools.styles";
import {useState} from "react";
import ImageCard from "./ImageCard";
import {useHistory} from "react-router-dom";

export default function ImageTools() {
    const classes = ImageToolsStyles();
    const history = useHistory();
    const [file, setFile] = useState({name: null});

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const viewImage = () => {
        history.push("/imageTools/123");
    }

    return (
        <Paper className={classes.main}>
            <Typography variant={"h4"} component={"h2"} >Image tools</Typography>

            <Paper elevation={2} className={`${classes.uploadBox} ${classes.main}`} >
                <Box className={classes.spacing} display="flex">
                    <Button variant="contained" component="label">
                        Choose File
                        <input onChange={handleFileChange} type="file" accept="image/*" hidden/>
                    </Button>

                    <Typography className={classes.fileName} component={"p"}>{file.name != null ? file.name : "Select image to crop background"}</Typography>
                </Box>

                <Button className={classes.spacing} disabled={file.name == null} variant="contained" component="label" color={"primary"}>
                    Upload File
                </Button>
            </Paper>

            <Paper className={classes.main}>
                <Typography variant={"h5"} component={"h4"} >Uploaded images</Typography>
                <Grid
                      justify="center"
                      className={classes.imageGridLayout}
                      container spacing={3}>
                    <Grid alignItems="center" item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={false} callback={viewImage}/>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}
