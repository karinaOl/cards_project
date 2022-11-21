import React, { useEffect, useState } from "react";
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
import { getCardsTC, updateCardTC, upgradeCardGradeTC } from "../../f4-cards/bll/cardsReducer";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { CircularProgress } from "@mui/material";
import { getRandomCard } from "./getRandomCard";

const formControlLabels = [
    "Didn't know",
    "Forgot",
    "A lot of thought",
    "Confused",
    "Knew the answer",
];

export const LearnPage = () => {
    const packName = useAppSelector((state) => state.cards.packName);
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<{ cardPackID: string }>();

    useEffect(() => {
        if (cardPackID) dispatch(getCardsTC({ cardsPack_id: cardPackID }));
        console.log("useEffect learn page");
    }, [cardPackID, dispatch]);

    if (!packName) {
        return (
            <div className="circularProgress">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <span>
                <NavLink className={style.navLink} to={PATH.PACKS}>
                    ⇦ Back to Pack List
                </NavLink>
            </span>
            <div className={style.LearnPageContainer}>
                <h2>Learn "{packName}"</h2>
                <div className={style.form}>
                    <Cards />
                </div>
            </div>
        </div>
    );
};

const Cards = () => {
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<{ cardPackID: string }>();
    const cards = useAppSelector((state) => state.cards.cards);
    const isLoading = useAppSelector((state) => state.app.isLoading);

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
            await dispatch(upgradeCardGradeTC(currentCard._id, value));
            await dispatch(updateCardTC(cardPackID as string, { ...currentCard }));
        }
    };

    const nextButtonHandler = () =>
        nextButton(formControlLabels.findIndex((arrayValues) => arrayValues === value) + 1);

    useEffect(() => {
        if (cards.length) {
            setCurrentCard(getRandomCard(cards));
        }
    }, []);

    return (
        <div>
            {currentCard ? (
                <div>
                    <h3>
                        Question: <span className={style.cardsText}>{currentCard.question}</span>
                    </h3>
                    <p style={{ fontWeight: 350 }}>Number of attempts: {currentCard.shots}</p>
                    {showAnswer && (
                        <div>
                            <h3>
                                Answer :{" "}
                                <span className={style.cardsText}>{currentCard.answer}</span>
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <FormControl sx={{ m: 3 }} variant="standard">
                                    <FormLabel id="demo-error-radios">Rate yourself : </FormLabel>
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
                </div>
            ) : (
                <div>no cards</div>
            )}
        </div>
    );
};
