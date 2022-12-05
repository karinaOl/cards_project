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
import { Navigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import style from "./PacksTable.module.css";
import { sortPackTC } from "../../bll/packsReducer";
import { PackType } from "../../dal/packs-api";
import IconButton from "@mui/material/IconButton";
import defaultCover from "./../../../../assets/images/images.png";

type PacksTableType = {
    setModalDeletePack: (value: boolean) => void;
    setCardsPackName: (value: string) => void;
    setPackId: (value: string) => void;
    setModalEditPack: (value: boolean) => void;
    setCardsPack: (cadsPack: PackType) => void;
};

export const PacksTable = (props: PacksTableType) => {
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const userId = useAppSelector((state) => state.profile._id);
    const [sortByName, setSortByName] = useState("0name");
    const [sortByCardsCount, setSortByCardsCount] = useState("0cardsCount");
    const [sortByUpdated, setSortByUpdated] = useState("0updated");

    const [learn, setLearn] = useState("");

    const openModalDelHandler = (packId: string, cardsPackName: string) => {
        props.setModalDeletePack(true);
        props.setPackId(packId);
        props.setCardsPackName(cardsPackName);
    };
    const openModalEditHandler = (cardsPack: PackType) => {
        props.setModalEditPack(true);
        props.setCardsPack(cardsPack);
    };

    const learnHandler = (packId: string) => {
        setLearn(packId);
    };

    // Sort functions

    const sortPackListByName = () => {
        setSortByName(sortByName === "1name" ? "0name" : "1name");
        dispatch(sortPackTC(sortByName));
    };

    const sortPackListByUpdatedTime = () => {
        setSortByUpdated(sortByUpdated === "1updated" ? "0updated" : "1updated");
        dispatch(sortPackTC(sortByUpdated));
    };

    const sortPackListByCardsCount = () => {
        setSortByCardsCount(sortByCardsCount === "1cardsCount" ? "0cardsCount" : "1cardsCount");
        dispatch(sortPackTC(sortByCardsCount));
    };

    if (learn) return <Navigate to={PATH.LEARN + "/" + learn} />;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className={style.commonButtons}>
                            <TableCell>Cover</TableCell>
                            <TableCell onClick={sortPackListByName}>
                                Name
                                <button>▼</button>
                            </TableCell>
                            <TableCell onClick={sortPackListByCardsCount}>
                                Cards
                                <button>▼</button>
                            </TableCell>
                            <TableCell onClick={sortPackListByUpdatedTime}>
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
                                <TableCell>
                                    <img
                                        src={row.deckCover ? row.deckCover : defaultCover}
                                        style={{ maxWidth: "150px" }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <NavLink
                                        to={PATH.CARDS + "/" + row._id}
                                        className={style.navLink}
                                    >
                                        {row.name}
                                    </NavLink>
                                </TableCell>
                                <TableCell>{row.cardsCount}</TableCell>
                                <TableCell>{row.updated}</TableCell>
                                <TableCell>{row.user_name}</TableCell>
                                <TableCell>
                                    <IconButton
                                        style={{ color: !isLoading ? "black" : "grey" }}
                                        disabled={isLoading}
                                    >
                                        <SchoolRoundedIcon
                                            onClick={() => learnHandler(row._id)}
                                            fontSize={"small"}
                                        />
                                    </IconButton>
                                    {row.user_id === userId && (
                                        <IconButton
                                            style={{ color: !isLoading ? "black" : "grey" }}
                                            disabled={isLoading}
                                        >
                                            <BorderColorRoundedIcon
                                                onClick={() => openModalEditHandler(row)}
                                                fontSize={"small"}
                                            />
                                        </IconButton>
                                    )}
                                    {row.user_id === userId && (
                                        <IconButton
                                            style={{ color: !isLoading ? "black" : "grey" }}
                                            disabled={isLoading}
                                        >
                                            <DeleteForeverRoundedIcon
                                                onClick={() =>
                                                    openModalDelHandler(row._id, row.name)
                                                }
                                                fontSize={"small"}
                                            />
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
