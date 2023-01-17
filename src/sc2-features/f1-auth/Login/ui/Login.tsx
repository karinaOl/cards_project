import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { loginTC } from "../bll/loginReducer";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import { Navigate, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be more symbol";
            }

            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE} />;
    }

    return (
        <Grid container justifyContent={"center"}>
            <Paper style={{ padding: "30px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in use common test</p>
                            <p>account credentials</p>
                            <p>
                                Email: <b>testp2505@gmail.com</b>
                            </p>
                            <p>
                                Password: <b>test_test</b>
                            </p>
                        </FormLabel>
                        <Typography variant="h5" component="h3" sx={{ flexGrow: 1 }}>
                            Sign in
                        </Typography>
                        <FormGroup>
                            <TextField
                                label="email"
                                variant="standard"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            )}
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">
                                    password
                                </InputLabel>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("password")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {formik.touched.password && formik.errors.password && (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            )}
                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps("rememberMe")}
                                    />
                                }
                            />
                            <FormLabel style={{ padding: "10px" }}>
                                <NavLink
                                    to={PATH.RECOVERY_PASSWORD}
                                    style={{ textDecoration: "none" }}
                                >
                                    Forgot Password?
                                </NavLink>
                            </FormLabel>
                            <Button type={"submit"} variant={"contained"}>
                                Sign In
                            </Button>
                        </FormGroup>
                        <FormLabel
                            style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
                        >
                            <span>Don’t have an account?</span>
                            <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
                        </FormLabel>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    );
};
