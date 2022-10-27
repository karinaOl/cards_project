import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import style from "./PacksTable.module.css";
import { deletePackTC, sortPackListByCardsCountAC } from "../../bll/packsReducer";
import { PackType } from "../../dal/packs-api";

export const PacksTable = () => {
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);
    const dispatch = useAppDispatch();
    const [sort, setSort] = useState(false);

    const deletePacks = (id: string) => {
        dispatch(deletePackTC(id));
    };

    // const sortFunction = (array: Array, value?: string | number) => {
    //     return array.sort((a, b) => a.value - b.value);
    // };

    const sortCardsCountInPack = () => {
        dispatch(
            sortPackListByCardsCountAC([
                ...packs.sort((a, b) =>
                    sort ? a.cardsCount - b.cardsCount : b.cardsCount - a.cardsCount
                ),
            ])
        );
        // sortFunction(cardsCount)
        // dispatch(sortPackListByCardsCountAC())
        console.log(packs);
        setSort(!sort);
    };

    const sortPackListByName = () => {};

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={style.sort} onClick={sortPackListByName}>
                                Name
                                <button>▼</button>
                            </TableCell>
                            <TableCell className={style.sort} onClick={sortCardsCountInPack}>
                                Cards
                                <button>▼</button>
                            </TableCell>
                            <TableCell className={style.sort} onClick={() => {}}>
                                Last Updated <button>▼</button>
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
                                    <DeleteForeverRoundedIcon
                                        onClick={() => {
                                            deletePacks(row._id);
                                        }}
                                        fontSize={"small"}
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