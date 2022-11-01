import React from "react";
import style from "./Profile.module.css";
import profileImg from "./../../../assets/images/profile-img.png";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { logoutTC } from "../bll/profileReducer";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { EditableName } from "../../../sc1-main/m1-ui/common/EditableName/EditableName";

export const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const email = useAppSelector((state) => state.profile.email);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;

    return (
        <Grid container justifyContent={"center"}>
            <Paper style={{ padding: "0 70px 20px" }}>
                <div className={style.profile}>
                    <h1>Personal information</h1>
                    <img className={style.profileImg} src={profileImg} alt="profileImg" />
                    <h3>
                        <EditableName />
                    </h3>
                    <p>{email}</p>
                    <Button variant="outlined" onClick={logoutHandler}>
                        Logout
                    </Button>
                </div>
            </Paper>
        </Grid>
    );
};
