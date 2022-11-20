import { setNewPasswordTC } from "../bll/newPasswordReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { ChangeEvent, useState } from "react";
import { NewPasswordType } from "../../Login/dal/login-api";
import { useParams } from "react-router-dom";

export const NewPassword = () => {
    const dispatch = useAppDispatch();
    const [newPassword, setNewPassword] = useState("");

    const { token } = useParams();
    console.log(token);

    const onclickHandler = () => {
        const data: NewPasswordType = {
            password: newPassword,
            resetPasswordToken: token as string,
        };

        dispatch(setNewPasswordTC(data));
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value);
    };

    return (
        <div>
            <div>Create new password</div>
            <input
                value={newPassword}
                onChange={onChangeHandler}
                placeholder="new password"
                type="text"
            />
            <button onClick={onclickHandler}>Create new password</button>
        </div>
    );
};
