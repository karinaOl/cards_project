import { useFormik } from "formik";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import { Navigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { registrationTC } from "../bll/registrationReducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";

type FormikErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export const Registration = () => {
    const dispatch = useAppDispatch();
    const isRegistration = useAppSelector<boolean>((state) => state.registration.isRegistration);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
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
                errors.password = "Password must be more 7 characters";
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = "Password must be more 7 characters";
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
            }
            return errors;
        },
        onSubmit: (values) => {
            if (values.password === values.confirmPassword) {
                dispatch(registrationTC(values));
                formik.resetForm();
            }
        },
    });

    if (isRegistration) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return (
        <Grid container justifyContent={"center"}>
            <Paper style={{ padding: "30px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <Typography variant="h5" component="h3" sx={{ flexGrow: 1 }}>
                            Sign up
                        </Typography>
                        <FormGroup>
                            <TextField
                                label="Email"
                                variant="standard"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            )}
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">
                                    Password
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
                            <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">
                                    Confirm password
                                </InputLabel>
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...formik.getFieldProps("confirmPassword")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
                            )}
                            <br />
                            <br />
                            <Button
                                disabled={
                                    formik.values.password !== formik.values.confirmPassword ||
                                    !formik.values.password
                                }
                                type={"submit"}
                                variant={"contained"}
                            >
                                Sign Up
                            </Button>
                        </FormGroup>
                        <FormLabel
                            style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
                        >
                            <span>Already have an account?</span>
                            <NavLink to={PATH.LOGIN}>Sign In</NavLink>
                        </FormLabel>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    );
};
