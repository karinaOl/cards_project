import {useFormik} from "formik";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {registrationTC, setError} from "../bll/registrationReducer";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {

    const dispatch = useAppDispatch();
    const isRegistration = useAppSelector<boolean>(state => state.registration.isRegistration)
    const error = useAppSelector<string>(state => state.registration.error)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
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
            } else if (values.password.length < 8) {
                errors.password = "Password must be more 7 characters"
            }

            return errors
        },
        onSubmit: values => {
            if (values.password === values.confirmPassword) {
                dispatch(registrationTC(values))
                formik.resetForm()
            } else {
                dispatch(setError("Incorrect password!"))
            }
        },
    });

    if (isRegistration) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>Email</div>
            <div>
                <input
                    id="email"
                    type="text"
                    {...formik.getFieldProps("email")}
                />
            </div>
            {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}

            <div>Password</div>
            <div>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                />
            </div>
            {formik.touched.password && formik.errors.password &&
                <div style={{color: "red"}}>{formik.errors.password}</div>}

            <div>Confirm password</div>
            <div>
                <input
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
                />
            </div>
            {formik.touched.password && formik.errors.password &&
                <div style={{color: "red"}}>{formik.errors.password}</div>}
            {error ? <div style={{color: "red"}}>{error}</div> : ""}

            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    )
}