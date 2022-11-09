import { BasicModal } from "../../../BasicModal/BasicModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { addCardTC } from "../../bll/cardsReducer";
import { useParams } from "react-router-dom";
import s from "../ModalCard/ModalCard.module.css";

type AddNewCardType = {
    modalAddCard: boolean;
    setModalAddCard: (value: boolean) => void;
};
export const ModalAddNewCard = (props: AddNewCardType) => {
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
    const addNewCardHandler = () => {
        dispatch(
            addCardTC({
                card: {
                    cardsPack_id: cardPackID as string,
                    question,
                    answer,
                },
            })
        );
        setQuestion("");
        setAnswer("");
        props.setModalAddCard(false);
    };

    return (
        <BasicModal
            title={"Add New Card"}
            open={props.modalAddCard}
            setModal={props.setModalAddCard}
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
                <Button variant="outlined" onClick={() => props.setModalAddCard(false)}>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={addNewCardHandler}>
                    Save
                </Button>
            </div>
        </BasicModal>
    );
};
