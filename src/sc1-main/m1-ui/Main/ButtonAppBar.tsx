import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../m2-bll/store";
import { logoutTC } from "../../../sc2-features/f2-profile/bll/profileReducer";
import { NavLink } from "react-router-dom";
import { PATH } from "./Pages";
import defaultImg from "../../../assets/images/profile-img.png";
import IconButton from "@mui/material/IconButton";

export default function ButtonAppBar() {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
    const userName = useAppSelector((state) => state.profile.name);
    const userAvatar = useAppSelector((state) => state.profile.avatar);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
                    {isLoggedIn && (
                        <div style={{ display: "flex", padding: "10px" }}>
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginRight: "30px",
                                }}
                            >
                                <img
                                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                                    src={userAvatar ? userAvatar : defaultImg}
                                    alt="userAvatar"
                                />
                                <IconButton style={{ color: "white", fontSize: "10px" }}>
                                    <span style={{ margin: "10px" }}>{userName}</span>
                                </IconButton>
                            </span>
                            <Button disabled={isLoading} onClick={logoutHandler} color="inherit">
                                Logout
                            </Button>
                        </div>
                    )}
                    {!isLoggedIn && (
                        <NavLink style={{ textDecoration: "none", color: "white" }} to={PATH.LOGIN}>
                            <Button color="inherit">Login</Button>
                        </NavLink>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
