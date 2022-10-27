import { CardsTable } from "./CardsTable/CardsTable";
import { Title } from "../../../sc1-main/m1-ui/common/Title/Title";
import { addCardTC } from "../bll/cardsReducer";
import { useAppDispatch } from "../../../sc1-main/m2-bll/store";
import { useParams } from "react-router-dom";
import s from "./Cards.module.css";
import TextField from "@mui/material/TextField/TextField";
import React from "react";

export const Cards = () => {
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<"cardPackID">();

    const addCard = () => {
        dispatch(
            addCardTC({
                card: {
                    cardsPack_id: cardPackID as string,
                    question: "Test question",
                    answer: "Test answer",
                },
            })
        );
    };

    return (
        <div className={s.cards}>
            <Title title={"My Pack"} buttonName={"Add new card"} callback={addCard} />
            <div className={s.titleBlock}>Search</div>
            <TextField
                className={s.input}
                id="outlined-basic"
                label="Provide your text"
                variant="outlined"
            />
            <CardsTable />
        </div>
    );
};
