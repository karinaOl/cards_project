import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useAppDispatch, useAppSelector } from "../../../m2-bll/store";
import {
    updateUserAC,
    updateUserNameTC,
} from "../../../../sc2-features/f2-profile/bll/profileReducer";
import style from "./EditableName.module.css";
import IconButton from "@mui/material/IconButton";

export const EditableName = () => {
    const name = useAppSelector<string>((state) => state.profile.name);
    const avatar = useAppSelector((state) => state.profile.avatar);
    const isLoading = useAppSelector((state) => state.app.isLoading);
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
            dispatch(updateUserNameTC(value));
            setEdit(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            <IconButton disabled={isLoading} onClick={activateEditMode}>
                <BorderColorOutlinedIcon />
            </IconButton>
            <div className={style.error}>{error}</div>
        </div>
    );
};
