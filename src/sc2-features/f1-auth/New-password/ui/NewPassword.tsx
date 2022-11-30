import { setNewPasswordTC } from "../bll/newPasswordReducer";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import * as React from "react";
import { useState } from "react";
import { NewPasswordType } from "../../Login/dal/login-api";
import { Navigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { FormikErrorType } from "../../Login/ui/Login";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";

export const NewPassword = () => {
    const dispatch = useAppDispatch();

    const { token } = useParams();
    const isNewPasswordIsSet = useAppSelector((state) => state.newPassword.isNewPasswordIsSet);

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = "This Field is Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be at least 8 characters";
            }

            return errors;
        },
        onSubmit: (values) => {
            const data: NewPasswordType = {
                password: values.password,
                resetPasswordToken: token as string,
            };

            dispatch(setNewPasswordTC(data));
            formik.resetForm();
        },
    });

    if (isNewPasswordIsSet) return <Navigate to={PATH.LOGIN} />;

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
                                Create new password
                            </Typography>
                            <FormGroup>
                                <FormControl
                                    style={{ margin: "20px", marginTop: "36px" }}
                                    variant="standard"
                                >
                                    <Input
                                        placeholder={"Password"}
                                        type={showPassword ? "text" : "password"}
                                        {...formik.getFieldProps("password")}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {formik.touched.password && formik.errors.password && (
                                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                                )}
                                <FormControl variant="standard"></FormControl>
                                <FormLabel
                                    style={{
                                        padding: "10px",
                                        fontSize: "16px",
                                    }}
                                >
                                    <span style={{ textDecoration: "none" }}>
                                        Create new password and we will send you further
                                        instructions to email
                                    </span>
                                </FormLabel>
                                <Button
                                    disabled={
                                        formik.errors.password ===
                                            "Password must be at least 8 characters" ||
                                        formik.errors.password === "This Field is Required" ||
                                        !formik.touched.password
                                    }
                                    type={"submit"}
                                    variant={"contained"}
                                >
                                    Create new password
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};
