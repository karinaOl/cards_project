import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { PackType } from "../../dal/packs-api";
import { updatePackTC } from "../../bll/packsReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./EditPackModal.module.css";

type EditPackModalPropsType = {
    modalEditPack: boolean;
    setModalEditPack: (value: boolean) => void;
    pack: PackType;
};

export const EditPackModal = (props: EditPackModalPropsType) => {
    useEffect(() => {
        props.pack.name ? setTitle(props.pack.name) : setTitle("");
        props.pack.private !== undefined ? setIsPrivate(props.pack.private) : setIsPrivate(true);
    }, [props.pack]);

    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>(props.pack.name);
    const [isPrivate, setIsPrivate] = useState<boolean>(props.pack.private);

    const changePackHandler = () => {
        dispatch(updatePackTC({ _id: props.pack._id, name: title, private: isPrivate }));
        props.setModalEditPack(false);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked);
    };

    return (
        <BasicModal
            title={"Edit pack"}
            open={props.modalEditPack}
            setModal={props.setModalEditPack}
        >
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
                <Button variant="outlined" onClick={() => props.setModalEditPack(false)}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={changePackHandler}>
                    Save
                </Button>
            </div>
        </BasicModal>
    );
};
