import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { updateCardTC } from "../../bll/cardsReducer";
import { useParams } from "react-router-dom";
import s from "../ModalCard/ModalCard.module.css";
import { UpdateCardRequestDataType } from "../../dal/cards-api";

type UpdateCardType = {
    modalUpdateCard: boolean;
    setModalUpdateCard: (value: boolean) => void;
    cardId: string;
    question: string;
    answer: string;
};
export const ModalUpdateCard = (props: UpdateCardType) => {
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState(props.question);
    const [answer, setAnswer] = useState(props.answer);
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
        props.setModalUpdateCard(false);
    };

    return (
        <BasicModal
            title={"Edit Card"}
            open={props.modalUpdateCard}
            setModal={props.setModalUpdateCard}
        >
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
                <Button variant="outlined" onClick={() => props.setModalUpdateCard(false)}>
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
