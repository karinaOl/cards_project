import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { ForgotPasswordDataType } from "../../Login/dal/login-api";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import { Navigate, NavLink } from "react-router-dom";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { FormikErrorType } from "../../Login/ui/Login";
import { recoveryPasswordTC, setRecoveryEmailAC } from "../bll/recoveryPasswordReducer";

export const RecoveryPassword = () => {
    const dispatch = useAppDispatch();

    const isSuccessRecovery = useAppSelector((state) => state.recoveryPassword.success);
    console.log(isSuccessRecovery);
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "This Field is Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        onSubmit: (values) => {
            const data: ForgotPasswordDataType = {
                email: values.email,
                from: "Vlad",
                message: `<div style="background-color: lightskyblue; padding: 15px"> password recovery link: 
<a href="http://localhost:3000/cards_project#/new-password/$token$">link</a></div>`,
            };
            dispatch(setRecoveryEmailAC(values.email));
            dispatch(recoveryPasswordTC(data));
            formik.resetForm();
        },
    });

    if (isSuccessRecovery) return <Navigate to={PATH.CHECK_EMAIL} />;

    return (
        <div>
            <Grid container justifyContent={"center"}>
                <Paper style={{ padding: "20px", width: "280px " }}>
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
                                    <div style={{ color: "red", marginTop: "16px" }}>
                                        {formik.errors.email}
                                    </div>
                                )}
                                <FormControl variant="standard"></FormControl>
                                <FormLabel
                                    style={{
                                        padding: "10px",
                                        fontSize: "16px",
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
                                        formik.errors.email === "This Field is Required" ||
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
