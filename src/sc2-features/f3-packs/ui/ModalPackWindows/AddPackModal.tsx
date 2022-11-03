import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { addPackTC } from "../../bll/packsReducer";
import styles from "./AddPackModal.module.css";

type AddPackModalPropsType = {
    open: boolean;
    setOpen: (value: boolean) => void;
};
export const AddPackModal = (props: AddPackModalPropsType) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked);
    };
    const onClickAddPacksHandler = () => {
        dispatch(addPackTC(title, isPrivate));
        setTitle("");
        setIsPrivate(false);
        handleClose();
    };
    const handleClose = () => props.setOpen(false);
    return (
        <BasicModal title={"Add New Pack"} open={props.open} setOpen={props.setOpen}>
            <TextField
                label="Name pack"
                variant="standard"
                value={title}
                onChange={onChangeTitleHandler}
                className={styles.textFiled}
            />
            <div className={styles.checkbox}>
                <Checkbox checked={isPrivate} onChange={onChangeCheckboxHandler} />
                <span>Privet pack</span>
            </div>
            <div className={styles.button}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={onClickAddPacksHandler}>
                    Save
                </Button>
            </div>
        </BasicModal>
    );
};
