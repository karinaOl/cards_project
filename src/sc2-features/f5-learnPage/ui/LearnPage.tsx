import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { NavLink, useParams } from "react-router-dom";
import style from "./LearnPage.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { CardType } from "../../f4-cards/dal/cards-api";
import { updateCardsGradeTC, updateCardTC } from "../../f4-cards/bll/cardsReducer";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";

const formControlLabels = [
    "Didn't know",
    "Forgot",
    "A lot of thought",
    "Confused",
    "Knew the answer",
];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return { sum: newSum, id: newSum < rand ? i : acc.id };
        },
        { sum: 0, id: -1 }
    );

    return cards[res.id + 1];
};

export const LearnPage = () => {
    const { cardPackID } = useParams<"cardPackID">();

    const cards = useAppSelector((state) => state.cards.cards);
    const packs = useAppSelector((state) => state.packs.cardPacks);

    const validCard = getCard(cards);
    const validPackArray = packs.find((elem) => elem._id === cardPackID);

    const packName = validPackArray ? validPackArray.name : "Default Name";

    return (
        <div>
            <NavLink className={style.navLink} to={PATH.PACKS}>
                ⇦ Back to Pack List
            </NavLink>
            <div className={style.LearnPageContainer}>
                <h2>Learn "{packName}"</h2>
                <div className={style.form}>
                    <Cards validCard={validCard} />
                </div>
            </div>
        </div>
    );
};

const Cards = (props: { validCard: CardType }) => {
    //

    const [value, setValue] = React.useState("");
    const [showAnswer, setShowAnswer] = useState(false);

    const dispatch = useAppDispatch();

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const { question, answer, shots, _id } = props.validCard;

    const showAnswerHandler = () => {
        setShowAnswer(true);
    };

    const updatedCard = {
        ...props.validCard,
        shots: props.validCard.shots + 1,
    };

    const nextButtonHandler = async (value: string) => {
        let grade;
        if (value === "Didn't know") grade = 1;
        if (value === "Forgot") grade = 2;
        if (value === "A lot of thought") grade = 3;
        if (value === "Confused") grade = 4;
        if (value === "Knew the answer") grade = 5;
        setShowAnswer(!showAnswer);
        if (grade) await dispatch(updateCardsGradeTC(grade, _id));
        dispatch(updateCardTC(props.validCard.cardsPack_id, updatedCard));
        setValue("");
    };

    return (
        <div>
            <h3>
                Question: <span className={style.cardsText}>{question}</span>
            </h3>
            <p style={{ fontWeight: 350 }}>Number of attempts: {shots}</p>
            {showAnswer && (
                <div>
                    <h3>
                        Answer : <span className={style.cardsText}>{answer}</span>
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 3 }} variant="standard">
                            <FormLabel id="demo-error-radios">Rate yourself : </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                onChange={handleRadioChange}
                            >
                                {formControlLabels.map((formLabel, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={formLabel}
                                        control={<Radio />}
                                        label={formLabel}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </form>
                </div>
            )}
            {!showAnswer && (
                <Button onClick={showAnswerHandler} variant="contained">
                    Show answer
                </Button>
            )}
            {showAnswer && (
                <div>
                    <Button
                        onClick={() => nextButtonHandler(value)}
                        sx={{ mt: 1, mr: 1 }}
                        type="submit"
                        variant="contained"
                        disabled={!value}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};
