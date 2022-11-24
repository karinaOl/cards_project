import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import React, { useEffect } from "react";
import { getCardsTC } from "../bll/cardsReducer";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";

export const CurrentCard = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const { cardPackID } = useParams<{ cardPackID: string }>();
    const isLoading = useAppSelector((state) => state.app.isLoading);

    const dispatch = useAppDispatch();

    const currentCard = useAppSelector((state) =>
        state.cards.cards.find((card) => card._id === cardId)
    );

    useEffect(() => {
        if (cardPackID) dispatch(getCardsTC({ cardsPack_id: cardPackID }));
    }, [cardPackID, dispatch]);

    if (!currentCard) {
        return (
            <div className="circularProgress">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            {currentCard ? (
                <div>
                    <Grid container justifyContent={"center"}>
                        <Paper style={{ padding: "20px", width: "280px " }}>
                            <FormControl>
                                <Typography
                                    style={{ fontWeight: "bold" }}
                                    variant="h5"
                                    component="h3"
                                    sx={{ flexGrow: 1 }}
                                >
                                    Question : " {currentCard.question} "
                                </Typography>
                                <FormGroup>
                                    <FormControl variant="standard"></FormControl>
                                    <FormLabel>
                                        <p style={{ textDecoration: "none" }}>
                                            Answer :
                                            <span
                                                style={{ fontWeight: "bold", marginLeft: "10px" }}
                                            >
                                                {currentCard.answer}
                                            </span>
                                        </p>
                                    </FormLabel>
                                    <Button
                                        disabled={isLoading}
                                        type={"submit"}
                                        variant={"contained"}
                                    >
                                        <NavLink
                                            style={{ textDecoration: "none", color: "white" }}
                                            to={PATH.CARDS + "/" + cardPackID}
                                        >
                                            Back to all cards
                                        </NavLink>
                                    </Button>
                                </FormGroup>
                                <FormLabel></FormLabel>
                            </FormControl>
                        </Paper>
                    </Grid>
                </div>
            ) : (
                <div>No card</div>
            )}
        </div>
    );
};
