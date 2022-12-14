import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import {
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import React, { useEffect } from "react";
import { getCardsTC } from "../../bll/cardsReducer";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import style from "../../../f3-packs/ui/PacksTable/PacksTable.module.css";
import IconButton from "@mui/material/IconButton";

type CardsTableType = {
    setModalDeleteCard: (value: boolean) => void;
    setModalUpdateCard: (value: boolean) => void;
    setCardId: (cardId: string) => void;
    setQuestion: (question: string) => void;
    setAnswer: (answer: string) => void;
};

export const CardsTable = (props: CardsTableType) => {
    const cards = useAppSelector((state) => state.cards.cards);
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.profile._id);
    const { cardPackID } = useParams<"cardPackID">();
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        if (cardPackID) {
            dispatch(getCardsTC({ cardsPack_id: cardPackID as string }));
        }
    }, [dispatch, cardPackID]);

    const deleteCardHandler = (cardID: string, question: string) => {
        props.setModalDeleteCard(true);
        props.setCardId(cardID);
        props.setQuestion(question);
    };

    const updateCardHandler = (cardID: string, question: string, answer: string) => {
        props.setModalUpdateCard(true);
        props.setCardId(cardID);
        props.setQuestion(question);
        props.setAnswer(answer);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Question</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Answer</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Last Updated</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Grade</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <NavLink
                                        to={PATH.CARDS + "/" + row.cardsPack_id + "/" + row._id}
                                        className={style.navLink}
                                    >
                                        {row.question}
                                    </NavLink>
                                </TableCell>
                                <TableCell>{row.answer}</TableCell>
                                <TableCell>{row.updated}</TableCell>
                                <TableCell>
                                    <Rating
                                        name="half-rating"
                                        defaultValue={row.grade}
                                        precision={0.5}
                                    />
                                </TableCell>
                                <TableCell>
                                    {row.user_id === userId && (
                                        <IconButton
                                            style={{ color: !isLoading ? "black" : "grey" }}
                                            disabled={isLoading}
                                            onClick={() =>
                                                updateCardHandler(row._id, row.question, row.answer)
                                            }
                                        >
                                            <BorderColorRoundedIcon fontSize={"small"} />
                                        </IconButton>
                                    )}
                                    {row.user_id === userId && (
                                        <IconButton
                                            style={{ color: !isLoading ? "black" : "grey" }}
                                            disabled={isLoading}
                                            onClick={() => deleteCardHandler(row._id, row.question)}
                                        >
                                            <DeleteForeverRoundedIcon fontSize={"small"} />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
