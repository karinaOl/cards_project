import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../m2-bll/store";
import { logoutTC } from "../../../sc2-features/f2-profile/bll/profileReducer";
import { NavLink } from "react-router-dom";
import { PATH } from "./Pages";

export default function ButtonAppBar() {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
    const userName = useAppSelector((state) => state.profile.name);
    const userAvatar = useAppSelector((state) => state.profile.avatar);

    const logout = () => {
        dispatch(logoutTC());
    };
    const loginHandler = () => {};

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
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
                                    style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                                    src={userAvatar!!}
                                    alt="userAvatar"
                                />
                                <span style={{ margin: "10px" }}>{userName}</span>
                            </span>
                            <Button onClick={logout} color="inherit">
                                Logout
                            </Button>
                        </div>
                    )}
                    {!isLoggedIn && (
                        <NavLink style={{ textDecoration: "none", color: "white" }} to={PATH.LOGIN}>
                            <Button onClick={loginHandler} color="inherit">
                                Login
                            </Button>
                        </NavLink>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
