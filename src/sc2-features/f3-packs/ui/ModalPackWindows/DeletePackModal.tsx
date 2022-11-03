import { BasicModal } from "../../../BasicModal/BasicModal";
import Button from "@mui/material/Button";
import { deletePackTC } from "../../bll/packsReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import styles from "./DeletePackModal.module.css";

type AddPackModalPropsType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    packId: string;
    cardsPackName: string;
};

export const DeletePackModal = (props: AddPackModalPropsType) => {
    const dispatch = useAppDispatch();

    const onClickDeleteCardsPackHandler = () => {
        dispatch(deletePackTC(props.packId));
        handleClose();
    };

    const handleClose = () => props.setOpen(false);
    return (
        <BasicModal title={"Delete Pack"} open={props.open} setOpen={props.setOpen}>
            <div className={styles.text}>
                <p>
                    Do you really want to remove <strong>{props.cardsPackName}</strong>?
                </p>
                <p>All card will be delete.</p>
            </div>
            <div className={styles.button}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    onClick={onClickDeleteCardsPackHandler}
                >
                    Delete
                </Button>
            </div>
        </BasicModal>
    );
};
