import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../../sc2-features/f1-auth/Login/ui/Login";
import { NewPassword } from "../../../sc2-features/f1-auth/New-password/ui/NewPassword";
import { RecoveryPassword } from "../../../sc2-features/f1-auth/Recovery-password/ui/RecoveryPassword";
import { Registration } from "../../../sc2-features/f1-auth/Registration/ui/Registration";
import { Error } from "./Error/Error";
import { Profile } from "../../../sc2-features/f2-profile/ui/Profile";
import { Test } from "../../../sc2-features/f0-test/Test";

export enum PATH {
    LOGIN = "/login",
    NEW_PASSWORD = "/new-password",
    RECOVERY_PASSWORD = "/recovery-password",
    REGISTRATION = "/registration",
    PROFILE = "/profile",
    TEST = "/test",
    ERROR404 = "/404",
}

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Navigate to={PATH.LOGIN} />} />

                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
                <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
                <Route path={PATH.REGISTRATION} element={<Registration />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.TEST} element={<Test />} />

                <Route path={PATH.ERROR404} element={<Error />} />
                <Route path={"*"} element={<Navigate to={PATH.ERROR404} />} />
            </Routes>
        </div>
    );
};
