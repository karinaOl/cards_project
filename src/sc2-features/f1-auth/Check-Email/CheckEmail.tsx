import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import checkEmailImg from "../../../assets/images/check-email-img.png";
import { NavLink } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { useAppSelector } from "../../../sc1-main/m2-bll/store";

export const CheckEmail = () => {
    const recoveryPasswordEmail = useAppSelector((state) => state.recoveryPassword.email);

    return (
        <Grid container justifyContent={"center"}>
            <Paper style={{ padding: "20px", width: "280px " }}>
                <FormControl>
                    <Typography
                        style={{ fontWeight: "bold" }}
                        variant="h5"
                        component="h3"
                        sx={{ flexGrow: 1 }}
                    >
                        Check Email
                    </Typography>
                    <IconButton disabled>
                        <img style={{ marginTop: "20px" }} src={checkEmailImg} alt="" />
                    </IconButton>
                    <FormGroup>
                        <FormControl variant="standard"></FormControl>
                        <FormLabel>
                            <p style={{ textDecoration: "none" }}>
                                We've sent an Email with instructions to{" "}
                                <span style={{ fontWeight: "bold" }}>{recoveryPasswordEmail}</span>
                            </p>
                        </FormLabel>
                        <Button type={"submit"} variant={"contained"}>
                            <NavLink
                                style={{ textDecoration: "none", color: "white" }}
                                to={PATH.LOGIN}
                            >
                                Back to login
                            </NavLink>
                        </Button>
                    </FormGroup>
                    <FormLabel></FormLabel>
                </FormControl>
            </Paper>
        </Grid>
    );
};
