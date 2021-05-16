import { makeStyles} from "@material-ui/core/styles";

export const InputStyles = makeStyles((theme) =>({
    formtitle: {
        width: 'auto',
        // marginTop: theme.spacing(3),
        // marginLeft: theme.spacing(3),
        fontSize: '24px'
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    table: {
        
    },
    submitBtn: {
        // marginLeft: theme.spacing(30)
    },
    chooseFiles: {
        
    },
    grid2: {
        // marginLeft: theme.spacing(1)
    },
    gridBtn: {
        marginTop: theme.spacing(3)
    },
    crystalType: {
        marginTop: theme.spacing(5)
    }
}))