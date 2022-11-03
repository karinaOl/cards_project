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
import React, { useEffect, useState } from "react";
import { getCardsTC } from "../../bll/cardsReducer";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { UpdateCard } from "../ModalCard/UpdateCard";
import { DeleteCard } from "../ModalCard/DeleteCard";

export const CardsTable = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cardId, setCardId] = useState("");
    const cards = useAppSelector((state) => state.cards.cards);
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<"cardPackID">();

    useEffect(() => {
        if (cardPackID) {
            console.log("catch");
            dispatch(getCardsTC({ cardsPack_id: cardPackID as string }));
        }
    }, [dispatch, cardPackID]);

    const deleteCardHandler = (cardID: string, question: string) => {
        setOpenDelete(true);
        setCardId(cardID);
        setQuestion(question);
    };

    const updateCardHandler = (cardID: string, question: string, answer: string) => {
        setOpenUpdate(true);
        setCardId(cardID);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <NavLink to={PATH.LEARN + "/" + row._id}>
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
                                    <BorderColorRoundedIcon
                                        onClick={() =>
                                            updateCardHandler(row._id, row.question, row.answer)
                                        }
                                        fontSize={"small"}
                                    />
                                    <DeleteForeverRoundedIcon
                                        fontSize={"small"}
                                        onClick={() => deleteCardHandler(row._id, row.question)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateCard cardId={cardId} open={openUpdate} setOpen={setOpenUpdate} />
            <DeleteCard
                open={openDelete}
                setOpen={setOpenDelete}
                question={question}
                cardId={cardId}
            />
        </>
    );
};
