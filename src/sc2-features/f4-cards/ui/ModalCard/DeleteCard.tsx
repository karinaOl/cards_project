import { BasicModal } from "../../../BasicModal/BasicModal";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { deleteCardTC } from "../../bll/cardsReducer";
import { useParams } from "react-router-dom";
import s from "../ModalCard/ModalCard.module.css";

type DeleteCardType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    question: string;
    cardId: string;
};
export const DeleteCard = (props: DeleteCardType) => {
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<"cardPackID">();

    const deleteCard = () => {
        dispatch(deleteCardTC(cardPackID as string, props.cardId));
        handleClose();
    };

    const handleClose = () => props.setOpen(false);

    return (
        <BasicModal title={"Add New Card"} open={props.open} setOpen={props.setOpen}>
            <p>Do you really want to remove {props.question}?</p>
            <p>All cards will be deleted.</p>
            <div className={s.buttons}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button color={"error"} variant="contained" onClick={deleteCard}>
                    Delete
                </Button>
            </div>
        </BasicModal>
    );
};
