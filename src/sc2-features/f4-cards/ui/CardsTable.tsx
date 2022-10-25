import { useAppDispatch } from "../../../sc1-main/m2-bll/store";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import React, { useEffect } from "react";
import { CardType } from "../dal/cards-api";

// export const CardsTable = () => {
//     const dispatch = useAppDispatch();
//     const cards = useAppDispatch<CardType[]>((state) => state.cards.cards);
//
//     useEffect(() => {
//         dispatch(getCardsTC());
//     });
//     return (
//         <>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Question</TableCell>
//                             <TableCell>Answer</TableCell>
//                             <TableCell>Last Updated</TableCell>
//                             <TableCell>Grade</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {cards.map((row) => (
//                             <TableRow
//                                 key={row._id}
//                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     <NavLink to={PATH.CARDS}>{row.question}</NavLink>
//                                 </TableCell>
//                                 <TableCell>{row.answer}</TableCell>
//                                 <TableCell>{row.updated}</TableCell>
//                                 <TableCell>{row.grade}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );
// };
