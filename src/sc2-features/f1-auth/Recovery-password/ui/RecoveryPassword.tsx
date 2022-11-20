import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { recoverPasswordTC } from "../../New-password/bll/newPasswordReducer";
import { ForgotPasswordDataType } from "../../Login/dal/login-api";

export const RecoveryPassword = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>("");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onClickHandler = () => {
        const data: ForgotPasswordDataType = {
            email,
            from: "Vlad",
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href="http://localhost:3000/cards_project#/new-password/$token$">
link</a>
</div>`,
        };

        dispatch(recoverPasswordTC(data));
    };
    return (
        <div>
            <input onChange={onChangeHandler} value={email} placeholder="email" type="text" />
            <button onClick={onClickHandler}>Send</button>
        </div>
    );
};
