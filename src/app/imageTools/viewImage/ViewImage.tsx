import {Grid, Paper, Typography} from "@material-ui/core";
import {ViewImagesStyles} from "./ViewImage.styles";
import ImageCard from "../ImageCard";

export default function ViewImage() {
    const classes = ViewImagesStyles();
    const viewParticleImage = () => {

    }

    return (
        <Paper className={classes.main}>
            <Typography variant={"h4"} component={"h2"}>Image</Typography>
            <Paper>
                <div className={classes.mainImg}>
                    <img src="https://petro.wovodat.org/assets/slider-img/option_2.png" alt={"image"}/>
                </div>
            </Paper>

            <Paper className={classes.main}>
                <Typography variant={"h5"} component={"h4"} >Particle images</Typography>
                <Grid className={classes.imageGridLayout} container spacing={3}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true}  callback={viewParticleImage}/>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <ImageCard editBtn={true} callback={viewParticleImage} />
                    </Grid>

                </Grid>
            </Paper>
        </Paper>
    )
}
