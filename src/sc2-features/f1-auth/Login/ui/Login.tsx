import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {loginTC} from "../bll/loginReducer";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import { Navigate } from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length <= 5) {
                errors.password = "Password must be more symbol"
            }

            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if(isLoggedIn){
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="text"
                {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
            <label htmlFor="password">password</label>
            <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password &&
            <div style={{color: "red"}}>{formik.errors.password}</div>}
            <label htmlFor="rememberMe">rememberMe</label>
            <input
                id="rememberMe"
                type="checkbox"
                {...formik.getFieldProps("rememberMe")}
            />
            <button type="submit">login</button>
        </form>
    )
}