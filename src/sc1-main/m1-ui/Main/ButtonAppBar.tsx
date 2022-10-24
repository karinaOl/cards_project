import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../m2-bll/store";
import { logoutTC } from "../../../sc2-features/f2-profile/bll/profileReducer";

export default function ButtonAppBar() {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutTC());
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Friday Project
                    </Typography>
                    {isLoggedIn && (
                        <Button onClick={logout} color="inherit">
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
