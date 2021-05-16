import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ImageToolsStyles} from "./ImageTools.styles";
import Confirm from "../../components/confirm/Confirm";


export default function ImageCard(props: { editBtn: boolean, callback: any }) {
    const {callback} = props;
    const classes = ImageToolsStyles();
    const [openDeleteCf, setOpenDeleteCf] = React.useState(false);

    const toggleDeleteConfirm = () => {
        setOpenDeleteCf(true);
    }

    const deleteImage = (cf: boolean) => {
        setOpenDeleteCf(false);
        if (cf) {
            console.log("deleted")
        }
    }

    const viewImage = () => {
        callback();
    }

    const editImage = () => {

    }

    const renderEditBtn = () => {
        if (props.editBtn) {
            return (
                <Button size="small" color="primary" onClick={editImage}>
                    Edit
                </Button>
            )
        }
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image="https://petro.wovodat.org/assets/img/EOS.png"
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Image
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={viewImage}>
                    View
                </Button>
                {renderEditBtn()}
                <Button size="small" color="secondary" onClick={toggleDeleteConfirm}>
                    Delete
                </Button>
            </CardActions>

            <Confirm open={openDeleteCf} title={"Delete image"} info={"Are you sure to delete this image?"}
                     callback={deleteImage}
            />
        </Card>
    );
}
