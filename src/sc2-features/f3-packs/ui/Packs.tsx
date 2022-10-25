import React, { useEffect, useState } from "react";
import {
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
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
import { GetCardsPackRequestParamsType, PackType } from "../dal/packs-api";
import FormControl from "@mui/material/FormControl";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);

    const [currentCardsPerPage, setCurrentCardsPerPage] = useState("10");
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cardsPerPage = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const choosePage = (page: number) => {
        const payload: GetCardsPackRequestParamsType = {
            page,
            pageCount: currentCardsPerPage,
        };
        dispatch(getPacksTC(payload));
    };
    const handleChange = (e: SelectChangeEvent) => {
        setCurrentCardsPerPage(e.target.value);
        const payload = {
            pageCount: e.target.value,
        };
        dispatch(getPacksTC(payload));
    };

    const addPacks = () => {
        dispatch(addPackTC("TEST_FROM_DELETE"));
    };

    const deletePacks = () => {
        dispatch(deletePackTC("6356b38d65c36e000499fa36"));
    };

    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch]);

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
            {pages.map((page, index) => (
                <span key={index} onClick={() => choosePage(page)}>
                    {page}
                </span>
                // <Pagination count={pages.length} onClick={() => choosePage(page)} color="primary" />
            ))}
            <span> Show </span>
            <FormControl sx={{ m: 1, minWidth: 40 }} size="small">
                <Select value={currentCardsPerPage} onChange={handleChange}>
                    {cardsPerPage.map((page, index) => (
                        <MenuItem key={index} value={page}>
                            {page}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};
