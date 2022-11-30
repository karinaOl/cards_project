import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { CardType } from "../../f4-cards/dal/cards-api";
import { getRandomCard } from "./getRandomCard";
import { updateCardTC, upgradeCardGradeTC } from "../../f4-cards/bll/cardsReducer";
import style from "./LearnPage.module.css";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";

const formControlLabels = [
    "Didn't know",
    "Forgot",
    "A lot of thought",
    "Confused",
    "Knew the answer",
];

export const CardsForLearning = () => {
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<{ cardPackID: string }>();
    const cards = useAppSelector((state) => state.cards.cards);
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const userId = useAppSelector((state) => state.profile._id);

    const [currentCard, setCurrentCard] = useState<CardType | undefined>(undefined);

    const [value, setValue] = React.useState("");
    const [showAnswer, setShowAnswer] = useState(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const nextButton = async (value: number) => {
        setShowAnswer(!showAnswer);
        setValue("");
        setCurrentCard(getRandomCard(cards));
        if (currentCard) {
            if (userId) {
                await dispatch(upgradeCardGradeTC(userId, currentCard._id, value));
                dispatch(updateCardTC(userId, cardPackID as string, { ...currentCard }));
            }
        }
    };

    const nextButtonHandler = () =>
        nextButton(formControlLabels.findIndex((arrayValues) => arrayValues === value) + 1);

    // useEffect(() => {
    //     if (cardPackID) dispatch(getCardsTC({ cardsPack_id: cardPackID }));
    // }, [cardPackID, dispatch]);

    useEffect(() => {
        if (cards.length) {
            setCurrentCard(getRandomCard(cards));
        }
    }, [dispatch, cardPackID]);

    return (
        <div>
            {currentCard ? (
                <Grid container justifyContent={"center"}>
                    <Paper style={{ padding: "20px", width: "280px " }}>
                        <FormControl>
                            <Typography
                                style={{ fontWeight: "bold" }}
                                variant="h5"
                                component="h3"
                                sx={{ flexGrow: 1 }}
                            >
                                Question:{" "}
                                <span className={style.cardsText}>{currentCard.question}</span>
                            </Typography>
                            <FormGroup>
                                <FormControl variant="standard"></FormControl>
                                <FormLabel>
                                    <span style={{ textDecoration: "none" }}>
                                        <span style={{ fontWeight: 350 }}>
                                            Number of attempts: {currentCard.shots}
                                        </span>
                                    </span>
                                </FormLabel>
                                {showAnswer && (
                                    <div>
                                        <h3>
                                            Answer :{" "}
                                            <span className={style.cardsText}>
                                                {currentCard.answer}
                                            </span>
                                        </h3>
                                        <form onSubmit={handleSubmit}>
                                            <FormControl sx={{ m: 3 }} variant="standard">
                                                <FormLabel id="demo-error-radios">
                                                    Rate yourself :{" "}
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-error-radios"
                                                    name="quiz"
                                                    onChange={handleRadioChange}
                                                >
                                                    {formControlLabels.map((formLabel, index) => {
                                                        return (
                                                            <FormControlLabel
                                                                key={index}
                                                                value={formLabel}
                                                                control={<Radio />}
                                                                label={formLabel}
                                                            />
                                                        );
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </form>
                                    </div>
                                )}
                                {!showAnswer && (
                                    <Button
                                        onClick={() => setShowAnswer(!showAnswer)}
                                        variant="contained"
                                        disabled={isLoading}
                                    >
                                        Show answer
                                    </Button>
                                )}
                                {showAnswer && (
                                    <div>
                                        <Button
                                            onClick={nextButtonHandler}
                                            sx={{ mt: 1, mr: 1 }}
                                            type="submit"
                                            variant="contained"
                                            disabled={!value}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </FormGroup>
                        </FormControl>
                    </Paper>
                </Grid>
            ) : (
                <div>NO CARDS</div>
            )}
        </div>
    );
};
