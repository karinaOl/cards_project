import React, { useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { changeCountOfPacksOnPageAC, changeCurrentPageAC } from "../bll/packsReducer";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { PacksTable } from "./PacksTable/PacksTable";
import { Title } from "../../../sc1-main/m1-ui/common/Title/Title";
import style from "./Packs.module.css";
import { AddPackModal } from "./ModalPackWindows/AddPackModal";
import { SettingsBar } from "./SettingsBar/SettingsBar";
import { GetCardsPackRequestParamsType, PackType } from "../dal/packs-api";
import { resetSettingsAC } from "../bll/settingsReducer";
import { DeletePackModal } from "./ModalPackWindows/DeletePackModal";
import { EditPackModal } from "./ModalPackWindows/EditPackModal";

export const Packs = () => {
    const [modalAddPack, setModalAddPack] = useState(false);
    const [modalDeletePack, setModalDeletePack] = useState(false);
    const [modalEditPack, setModalEditPack] = useState(false);
    const [cardsPackName, setCardsPackName] = useState("");
    const [packId, setPackId] = useState("");
    const [cardsPack, setCardsPack] = useState({} as PackType);

    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.packs.page);
    const countOfPacksOnPage = useAppSelector((state) => state.packs.pageCount).toString();

    const cardsPerPage = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const changeCountOfCards = (e: SelectChangeEvent) => {
        dispatch(changeCountOfPacksOnPageAC(+e.target.value));
    };

    const changeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changeCurrentPageAC(value));
    };
    const resetPackListFilter = (data: GetCardsPackRequestParamsType) => {
        dispatch(resetSettingsAC(data));
    };

    return (
        <div className={style.packs}>
            <Title
                title={"Packs list"}
                buttonName={"Add new pack"}
                callback={() => setModalAddPack(true)}
            />
            <SettingsBar
                resetPackListFilter={resetPackListFilter}
                currentPage={currentPage}
                countOfPacksOnPage={countOfPacksOnPage}
            />
            <PacksTable
                setModalEditPack={setModalEditPack}
                setCardsPack={setCardsPack}
                setModalDeletePack={setModalDeletePack}
                setPackId={setPackId}
                setCardsPackName={setCardsPackName}
            />
            <Stack spacing={4}>
                <Typography style={{ color: "dodgerblue", margin: "20px" }}>
                    Current Page: {currentPage}
                </Typography>
                <Pagination style={{}} count={10} page={currentPage} onChange={changeCurrentPage} />
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
            {modalAddPack && (
                <AddPackModal modalAddPack={modalAddPack} setModalAddPack={setModalAddPack} />
            )}
            {modalDeletePack && (
                <DeletePackModal
                    packId={packId}
                    modalDeletePack={modalDeletePack}
                    setModalDeletePack={setModalDeletePack}
                    cardsPackName={cardsPackName}
                />
            )}
            {modalEditPack && (
                <EditPackModal
                    modalEditPack={modalEditPack}
                    setModalEditPack={setModalEditPack}
                    pack={cardsPack}
                />
            )}
        </div>
    );
};
