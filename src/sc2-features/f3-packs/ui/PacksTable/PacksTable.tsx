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
import { sortPackListAC } from "../../bll/packsReducer";
import { PackType } from "../../dal/packs-api";
import { DeletePackModal } from "../ModalPackWindows/DeletePackModal";
import { EditPackModal } from "../ModalPackWindows/UpdataPackModal";

export const PacksTable = () => {
    const packs = useAppSelector<PackType[]>((state) => state.packs.cardPacks);
    const dispatch = useAppDispatch();

    const [sort, setSort] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [packId, setPackId] = useState("");
    const [cardsPack, setCardsPack] = useState<PackType>({} as PackType);
    const [learn, setLearn] = useState(false);

    const handleOpenDel = (packId: string) => {
        setOpenDel(true);
        setPackId(packId);
    };
    const handleOpenEdit = (cardsPack: PackType) => {
        setOpenEdit(true);
        setCardsPack(cardsPack);
    };

    const learnHandler = () => {
        setLearn(true);
    };

    // Sort common functions

    const sortFunctionByCardsCount = (): PackType[] =>
        packs.sort((a, b) => (sort ? a.cardsCount - b.cardsCount : b.cardsCount - a.cardsCount));

    const sortFunctionByName = (): PackType[] =>
        packs.sort((a, b) => (sort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

    const sortFunctionByUpdatedTime = (): PackType[] =>
        packs.sort((a, b) =>
            sort ? a.updated.localeCompare(b.updated) : b.updated.localeCompare(a.updated)
        );

    // Sort handle functions

    const sortPackListByCardsCount = () => {
        dispatch(sortPackListAC(sortFunctionByCardsCount()));
        setSort(!sort);
    };

    const sortPackListByName = () => {
        dispatch(sortPackListAC(sortFunctionByName()));
        setSort(!sort);
    };

    const sortPackListByUpdatedTime = () => {
        dispatch(sortPackListAC(sortFunctionByUpdatedTime()));
        setSort(!sort);
    };

    if (learn) return <Navigate to={PATH.LEARN} />;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={style.commonButtons} onClick={sortPackListByName}>
                                Name
                                <button>▼</button>
                            </TableCell>
                            <TableCell
                                className={style.commonButtons}
                                onClick={sortPackListByCardsCount}
                            >
                                Cards
                                <button>▼</button>
                            </TableCell>
                            <TableCell
                                className={style.commonButtons}
                                onClick={sortPackListByUpdatedTime}
                            >
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
                                <TableCell className={style.commonButtons}>
                                    <SchoolRoundedIcon onClick={learnHandler} fontSize={"small"} />
                                    <BorderColorRoundedIcon
                                        onClick={() => handleOpenEdit(row)}
                                        fontSize={"small"}
                                    />
                                    <DeleteForeverRoundedIcon
                                        onClick={() => handleOpenDel(row._id)}
                                        fontSize={"small"}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeletePackModal open={openDel} setOpen={setOpenDel} packId={packId} />
            <EditPackModal open={openEdit} setOpen={setOpenEdit} pack={cardsPack} />
        </>
    );
};
