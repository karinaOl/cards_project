import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { PackType } from "../../dal/packs-api";
import { updatePackTC } from "../../bll/packsReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./EditPackModal.module.css";
import { InputTypeFilePacks } from "./InputTypeFilePacks";

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
    const [cover, setCover] = useState(props.pack.deckCover);

    const changePackHandler = () => {
        dispatch(
            updatePackTC({ _id: props.pack._id, name: title, deckCover: cover, private: isPrivate })
        );
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
            {cover && (
                <div className={styles.image}>
                    <img src={cover} style={{ maxWidth: "100%" }} />
                </div>
            )}
            <TextField
                label="Name pack"
                variant="standard"
                value={title}
                onChange={onChangeTitleHandler}
                className={styles.textFiled}
            />
            <div className={styles.inputType}>
                <InputTypeFilePacks setCover={setCover} name={"UPDATE NEW COVER"} />
            </div>
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
