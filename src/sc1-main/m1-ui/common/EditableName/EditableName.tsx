import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField/TextField";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

export const EditableName = (props: EditableNamePropsType) => {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.name);

    const activateEditMode = () => {
        setEdit(true);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    };

    const activateViewMode = () => {
        props.changeName(text);
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
            <BorderColorOutlinedIcon onClick={activateEditMode} />
        </div>
    );
};

export type EditableNamePropsType = {
    name: string;
    changeName: (name: string) => void;
};
