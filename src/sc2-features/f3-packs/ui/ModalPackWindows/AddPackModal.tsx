import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { addPackTC } from "../../bll/packsReducer";
import styles from "./AddPackModal.module.css";
import { InputTypeFilePacks } from "./InputTypeFilePacks";

type AddPackModalPropsType = {
    modalAddPack: boolean;
    setModalAddPack: (value: boolean) => void;
};

export const AddPackModal = (props: AddPackModalPropsType) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked);
    };
    const onClickAddPacksHandler = () => {
        dispatch(addPackTC(title, cover, isPrivate));
        setTitle("");
        setIsPrivate(false);
        setCover("");
        props.setModalAddPack(false);
    };

    return (
        <BasicModal
            title={"Add New Pack"}
            open={props.modalAddPack}
            setModal={props.setModalAddPack}
        >
            <TextField
                label="Name pack"
                variant="standard"
                value={title}
                onChange={onChangeTitleHandler}
                className={styles.textFiled}
            />
            <div className={styles.inputType}>
                <InputTypeFilePacks setCover={setCover} name={"ADD NEW COVER"} />
            </div>
            <div className={styles.checkbox}>
                <Checkbox checked={isPrivate} onChange={onChangeCheckboxHandler} />
                <span>Private pack</span>
            </div>
            <div className={styles.button}>
                <Button variant="outlined" onClick={() => props.setModalAddPack(false)}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={onClickAddPacksHandler}>
                    Save
                </Button>
            </div>
        </BasicModal>
    );
};
