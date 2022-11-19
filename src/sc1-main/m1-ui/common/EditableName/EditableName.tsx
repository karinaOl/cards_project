import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useAppDispatch, useAppSelector } from "../../../m2-bll/store";
import {
    updateUserAC,
    updateUserNameTC,
} from "../../../../sc2-features/f2-profile/bll/profileReducer";
import style from "./EditableName.module.css";
import { Icon } from "@mui/material";

export const EditableName = () => {
    const name = useAppSelector<string>((state) => state.profile.name);
    const avatar = useAppSelector((state) => state.profile.avatar);

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(name);
    const [error, setError] = useState<null | string>(null);

    const dispatch = useAppDispatch();

    const activateEditMode = () => {
        setEdit(true);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setError("to short name");
        } else {
            setError(null);
        }
        setValue(e.currentTarget.value);
    };

    const activateViewMode = () => {
        if (value) {
            dispatch(updateUserAC({ name: value, avatar }));
            dispatch(updateUserNameTC(value, avatar as string));
            setEdit(false);
        }
    };

    return (
        <div>
            {edit ? (
                <TextField
                    autoFocus
                    onBlur={activateViewMode}
                    value={value}
                    onChange={onChangeHandler}
                    type="text"
                />
            ) : (
                <span onDoubleClick={activateEditMode}>{value} </span>
            )}
            <Icon>
                <BorderColorOutlinedIcon onClick={activateEditMode} />
            </Icon>
            <div className={style.error}>{error}</div>
        </div>
    );
};
