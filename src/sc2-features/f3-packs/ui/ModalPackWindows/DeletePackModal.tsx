import { BasicModal } from "../../../BasicModal/BasicModal";
import Button from "@mui/material/Button";
import { deletePackTC } from "../../bll/packsReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import styles from "./DeletePackModal.module.css";

type AddPackModalPropsType = {
    modalDeletePack: boolean;
    setModalDeletePack: (value: boolean) => void;
    packId: string;
    cardsPackName: string;
};

export const DeletePackModal = (props: AddPackModalPropsType) => {
    const dispatch = useAppDispatch();

    const deleteCardsPackHandler = () => {
        dispatch(deletePackTC(props.packId));
        props.setModalDeletePack(false);
    };

    return (
        <BasicModal
            title={"Delete Pack"}
            open={props.modalDeletePack}
            setModal={props.setModalDeletePack}
        >
            <div className={styles.text}>
                <span>
                    Do you really want to remove <strong>{props.cardsPackName}</strong>?
                </span>
                <span>All card will be delete.</span>
            </div>
            <div className={styles.button}>
                <Button variant="outlined" onClick={() => props.setModalDeletePack(false)}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    onClick={deleteCardsPackHandler}
                >
                    Delete
                </Button>
            </div>
        </BasicModal>
    );
};
