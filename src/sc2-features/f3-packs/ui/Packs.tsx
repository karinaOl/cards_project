import React, { useEffect } from "react";
import {
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import {
    addPackTC,
    changeCountOfPacksOnPageAC,
    changeCurrentPageAC,
    deletePackTC,
    getPacksTC,
    sortCardsCountAC,
} from "../bll/packsReducer";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { PackType } from "../dal/packs-api";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import style from "./Packs.module.css";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);
    const currentPage = useAppSelector((state) => state.packs.page);
    const countOfPacksOnPage = useAppSelector((state) => state.packs.pageCount).toString();
    const countOfCardsInPack = useAppSelector((state) => state.packs.cardPacks);

    const cardsPerPage = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const changeCountOfCards = (e: SelectChangeEvent) => {
        dispatch(changeCountOfPacksOnPageAC(+e.target.value));
        dispatch(getPacksTC());
    };

    const changeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changeCurrentPageAC(value));
    };

    const sortCardsCountInPack = () => {
        dispatch(
            sortCardsCountAC([...countOfCardsInPack.sort((a, b) => a.cardsCount - b.cardsCount)])
        );
    };

    const addPacks = () => {
        dispatch(addPackTC("TEST_FROM_DELETE"));
    };

    const deletePacks = () => {
        dispatch(deletePackTC("6356b38d65c36e000499fa36"));
    };

    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, currentPage]);

    return (
        <>
            <button onClick={addPacks}>+</button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={sortCardsCountInPack}>
                                Name<button className={style.sortButton}>▼</button>
                            </TableCell>
                            <TableCell onClick={sortCardsCountInPack}>
                                Cards<button className={style.sortButton}>▼</button>
                            </TableCell>
                            <TableCell onClick={sortCardsCountInPack}>
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
            <div>
                <Stack spacing={4}>
                    <Typography style={{ color: "dodgerblue", margin: "20px" }}>
                        Current Page: {currentPage}
                    </Typography>
                    <Pagination
                        style={{}}
                        count={10}
                        page={currentPage}
                        onChange={changeCurrentPage}
                    />
                </Stack>
                <FormControl sx={{ m: -5, minWidth: 40 }} size="small">
                    <span className={style.showSpanText}>Show</span>
                    <Select
                        value={countOfPacksOnPage}
                        onChange={changeCountOfCards}
                        style={{ top: "2px" }}
                        sx={{ top: "2px" }}
                    >
                        {cardsPerPage.map((page, index) => (
                            <MenuItem key={index} value={page}>
                                {page}
                            </MenuItem>
                        ))}
                    </Select>
                    <span className={style.spanCardsText}>Cards per Page</span>
                </FormControl>
            </div>
        </>
    );
};
