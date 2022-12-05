import React, { useEffect, useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { changeCountOfPacksOnPageAC, changeCurrentPageAC } from "../bll/packsReducer";
import FormControl from "@mui/material/FormControl";
import { PacksTable } from "./PacksTable/PacksTable";
import { Title } from "../../../sc1-main/m1-ui/common/Title/Title";
import style from "./Packs.module.css";
import { AddPackModal } from "./ModalPackWindows/AddPackModal";
import { SettingsBar } from "./SettingsBar/SettingsBar";
import { GetCardsPackRequestParamsType, PackType } from "../dal/packs-api";
import { resetSettingsAC } from "../bll/settingsReducer";
import { DeletePackModal } from "./ModalPackWindows/DeletePackModal";
import { EditPackModal } from "./ModalPackWindows/EditPackModal";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { setCardsAC, setPackNameAC } from "../../f4-cards/bll/cardsReducer";
import { PaginationWithSelectBlock } from "../../../utils/PaginationWithSelectBlock/PaginationWithSelectBlock";

export const Packs = () => {
    const [modalAddPack, setModalAddPack] = useState(false);
    const [modalDeletePack, setModalDeletePack] = useState(false);
    const [modalEditPack, setModalEditPack] = useState(false);
    const [cardsPackName, setCardsPackName] = useState("");
    const [packId, setPackId] = useState("");
    const [cardsPack, setCardsPack] = useState({} as PackType);
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const currentPage = useAppSelector((state) => state.packs.page);
    const countOfPacksOnPage = useAppSelector((state) => state.packs.pageCount);
    const packsTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);

    const resetPackListFilter = (data: GetCardsPackRequestParamsType) => {
        dispatch(resetSettingsAC(data));
    };

    const changeCountOfPacksOnPage = (e: SelectChangeEvent) => {
        dispatch(changeCountOfPacksOnPageAC(+e.target.value));
    };

    const changeCurrentPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changeCurrentPageAC(value));
    };

    useEffect(() => {
        dispatch(setPackNameAC(""));
        dispatch(setCardsAC([]));
    }, [dispatch]);

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;

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
                countOfPacksOnPage={countOfPacksOnPage.toString()}
            />
            <PacksTable
                setModalEditPack={setModalEditPack}
                setCardsPack={setCardsPack}
                setModalDeletePack={setModalDeletePack}
                setPackId={setPackId}
                setCardsPackName={setCardsPackName}
            />
            <PaginationWithSelectBlock
                currentPage={currentPage}
                countOfEssenceOnPage={countOfPacksOnPage}
                essenceTotalCount={packsTotalCount}
                changeCountOfEssenceOnPage={changeCountOfPacksOnPage}
                changeCurrentPage={changeCurrentPage}
                text="Packs per Page"
            />
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
