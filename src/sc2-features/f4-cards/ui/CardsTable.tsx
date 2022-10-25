import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import React, { useEffect } from "react";
import { addCardTC, deleteCardTC, getCardsTC, updateCardTC } from "../bll/cardsReducer";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { UpdateCardRequestDataType } from "../dal/cards-api";

export const CardsTable = () => {
    const cards = useAppSelector((state) => state.cards.cards);

    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<"cardPackID">();

    useEffect(() => {
        if (cardPackID) dispatch(getCardsTC({ cardsPack_id: cardPackID }));
    }, []);

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

    const deleteCard = (cardID: string) => {
        dispatch(deleteCardTC(cardPackID as string, cardID));
    };

    const updateCard = (cardID: string) => {
        const updatedCard: UpdateCardRequestDataType = { _id: cardID, answer: "test_update_card" };
        dispatch(updateCardTC(cardPackID as string, updatedCard));
    };

    return (
        <>
            <button onClick={addCard}>+</button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <NavLink to={PATH.CARDS}>{row.question}</NavLink>
                                </TableCell>
                                <TableCell>{row.answer}</TableCell>
                                <TableCell>{row.updated}</TableCell>
                                <TableCell>{row.grade}</TableCell>
                                <TableCell>
                                    <BorderColorRoundedIcon
                                        fontSize={"small"}
                                        onClick={() => updateCard(row._id)}
                                    />
                                    <DeleteForeverRoundedIcon
                                        fontSize={"small"}
                                        onClick={() => deleteCard(row._id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
