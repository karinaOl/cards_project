import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useAppDispatch } from "../../../m2-bll/store";
import { updateUserNameTC } from "../../../../sc2-features/f2-profile/bll/profileReducer";
import style from "./EditableName.module.css";
import { Icon } from "@mui/material";

export const EditableName = (props: EditableNamePropsType) => {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.name);
    const [error, setError] = useState<null | string>(null);

    const dispatch = useAppDispatch();

    const activateEditMode = () => {
        setEdit(true);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "") {
            setError("to short name");
        } else {
            setError(null);
        }
        setText(e.currentTarget.value);
    };

    const activateViewMode = () => {
        dispatch(updateUserNameTC(text));
        setEdit(false);
    };

    return (
        <div>
            {edit ? (
                <TextField
                    autoFocus
                    onBlur={activateViewMode}
                    value={text}
                    onChange={onChangeHandler}
                    type="text"
                />
            ) : (
                <span onDoubleClick={activateEditMode}>{text} </span>
            )}
            <Icon>
                <BorderColorOutlinedIcon onClick={activateEditMode} />
            </Icon>
            <div className={style.error}>{error}</div>
        </div>
    );
};

export type EditableNamePropsType = {
    name: string;
};
