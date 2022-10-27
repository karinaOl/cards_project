import React from "react";
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
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { PackType } from "../dal/packs-api";
import { deletePackTC, sortCardsCountAC } from "../bll/packsReducer";
import style from "./Packs.module.css";

export const PacksTable = () => {
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);
    const dispatch = useAppDispatch();

    const deletePacks = () => {
        dispatch(deletePackTC("6356b38d65c36e000499fa36"));
    };

    const sortCardsCountInPack = () => {
        dispatch(sortCardsCountAC([...packs.sort((a, b) => a.cardsCount - b.cardsCount)]));
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => {}}>
                                Name<button className={style.sortButton}>▼</button>
                            </TableCell>
                            <TableCell onClick={sortCardsCountInPack}>
                                Cards<button className={style.sortButton}>▼</button>
                            </TableCell>
                            <TableCell onClick={() => {}}>
                                Last Updated <button className={style.sortButton}>▼</button>
                            </TableCell>
                            <TableCell>Created by</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <NavLink to={PATH.CARDS + "/" + row._id}>{row.name}</NavLink>
                                </TableCell>
                                <TableCell>{row.cardsCount}</TableCell>
                                <TableCell>{row.updated}</TableCell>
                                <TableCell>{row.user_name}</TableCell>
                                <TableCell>
                                    <SchoolRoundedIcon fontSize={"small"} />
                                    <BorderColorRoundedIcon fontSize={"small"} />
                                    <DeleteForeverRoundedIcon fontSize={"small"} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
