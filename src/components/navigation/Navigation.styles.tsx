import {makeStyles} from "@material-ui/core/styles";

export const NavigationStyles = makeStyles({
    header: {
        paddingLeft: "1%",
        paddingRight: "1%",
    },
    navBtn: {
        fontSize: "16px",
        borderRadius: "5px",
        height: "64px",
        paddingLeft: "20px",
        paddingRight: "20px",
        '&:hover': {
            background: "white",
            color: "black"
        },
        color: "white",
    },
    loginBtn: {
        marginLeft: "auto"
    },
    noHyperLink: {
        textDecoration: "none"
    }
});
