import * as React from "react";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { recoverPasswordTC } from "../../New-password/bll/newPasswordReducer";
import { ForgotPasswordDataType } from "../../Login/dal/login-api";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { NavLink } from "react-router-dom";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { FormikErrorType } from "../../Login/ui/Login";

export const RecoveryPassword = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            console.log(errors.email);
            return errors;
        },
        onSubmit: (values) => {
            const data: ForgotPasswordDataType = {
                email: values.email,
                from: "Vlad",
                message: `<div style="background-color: lime; padding: 15px"> password recovery link: 
<a href="http://localhost:3000/cards_project#/new-password/$token$">link</a></div>`,
            };

            dispatch(recoverPasswordTC(data));
            formik.resetForm();
        },
    });

    return (
        <div>
            <div></div>
            <Grid container justifyContent={"center"}>
                <Paper style={{ padding: "70px", width: "280px " }}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <Typography
                                style={{ fontWeight: "bold" }}
                                variant="h5"
                                component="h3"
                                sx={{ flexGrow: 1 }}
                            >
                                Forgot your password ?
                            </Typography>
                            <FormGroup>
                                <TextField
                                    style={{ marginTop: "16px" }}
                                    label="Email"
                                    variant="standard"
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                                )}
                                <FormControl variant="standard"></FormControl>
                                <FormLabel
                                    style={{
                                        padding: "10px",
                                        marginBottom: "30px",
                                        marginTop: "16px",
                                        fontSize: "10px",
                                    }}
                                >
                                    <p style={{ textDecoration: "none" }}>
                                        Enter your email address and we will send you further
                                        instructions
                                    </p>
                                </FormLabel>
                                <Button
                                    disabled={
                                        formik.errors.email === "Invalid email address" ||
                                        formik.errors.email === "Required" ||
                                        !formik.touched.email
                                    }
                                    type={"submit"}
                                    variant={"contained"}
                                >
                                    Send Instructions
                                </Button>
                            </FormGroup>
                            <FormLabel>
                                <p>Did you remember your password ?</p>
                                <NavLink to={PATH.LOGIN} style={{ color: "blue" }}>
                                    Try logging in
                                </NavLink>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};
