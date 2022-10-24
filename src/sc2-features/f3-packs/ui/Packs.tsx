import React, { useEffect } from "react";
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
import { addPackTC, deletePackTC, getPacksTC } from "../bll/packsReducer";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { PackType } from "../dal/packs-api";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);

    const addPacks = () => {
        dispatch(addPackTC("TEST_FROM_DELETE", {}));
    };

    const deletePacks = () => {
        dispatch(deletePackTC("6356b38d65c36e000499fa36", {}));
    };

    useEffect(() => {
        dispatch(getPacksTC({ pageCount: 5 }));
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Cards</TableCell>
                            <TableCell>Last Updated</TableCell>
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
                                    <NavLink to={PATH.PACKS}>{row.name}</NavLink>
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
