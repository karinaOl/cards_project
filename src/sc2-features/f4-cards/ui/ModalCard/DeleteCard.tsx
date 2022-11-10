import { BasicModal } from "../../../BasicModal/BasicModal";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { deleteCardTC } from "../../bll/cardsReducer";
import { useParams } from "react-router-dom";
import s from "../ModalCard/ModalCard.module.css";

type DeleteCardType = {
    modalDeleteCard: boolean;
    setModalDeleteCard: (value: boolean) => void;
    question: string;
    cardId: string;
};

export const ModalDeleteCard = (props: DeleteCardType) => {
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<"cardPackID">();

    const deleteCard = () => {
        dispatch(deleteCardTC(cardPackID as string, props.cardId));
        props.setModalDeleteCard(false);
    };

    return (
        <BasicModal
            title={"Add New Card"}
            open={props.modalDeleteCard}
            setModal={props.setModalDeleteCard}
        >
            <p>Do you really want to remove {props.question}?</p>
            <p>All cards will be deleted.</p>
            <div className={s.buttons}>
                <Button variant="outlined" onClick={() => props.setModalDeleteCard(false)}>
                    Cancel
                </Button>
                <Button color={"error"} variant="contained" onClick={deleteCard}>
                    Delete
                </Button>
            </div>
        </BasicModal>
    );
};
