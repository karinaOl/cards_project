import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { addCardTC, updateCardTC } from "../../bll/cardsReducer";
import { useParams } from "react-router-dom";
import s from "../ModalCard/ModalCard.module.css";
import { CardType, UpdateCardRequestDataType } from "../../dal/cards-api";

type UpdateCardType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    cardId: string;
};
export const UpdateCard = (props: UpdateCardType) => {
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const { cardPackID } = useParams<"cardPackID">();

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value);
    };
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value);
    };
    const updateCard = (cardID: string) => {
        const updatedCard: UpdateCardRequestDataType = { _id: cardID, question, answer };
        dispatch(updateCardTC(cardPackID as string, updatedCard));
        handleClose();
    };

    const handleClose = () => props.setOpen(false);

    return (
        <BasicModal title={"Edit Card"} open={props.open} setOpen={props.setOpen}>
            <div>
                <TextField
                    className={s.input}
                    label="Question"
                    variant="standard"
                    value={question}
                    onChange={onChangeQuestionHandler}
                />
                <TextField
                    className={s.input}
                    label="Answer"
                    variant="standard"
                    value={answer}
                    onChange={onChangeAnswerHandler}
                />
            </div>
            <div className={s.buttons}>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        updateCard(props.cardId);
                    }}
                >
                    Save
                </Button>
            </div>
        </BasicModal>
    );
};
