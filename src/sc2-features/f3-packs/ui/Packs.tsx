import React, { useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { changeCountOfPacksOnPageAC, changeCurrentPageAC } from "../bll/packsReducer";
import FormControl from "@mui/material/FormControl";
import { PacksTable } from "./PacksTable/PacksTable";
import { Title } from "../../../sc1-main/m1-ui/common/Title/Title";
import style from "./Packs.module.css";
import { AddPackModal } from "./ModalPackWindows/AddPackModal";
import { SettingsBar } from "./SettingsBar/SettingsBar";
import { GetCardsPackRequestParamsType } from "../dal/packs-api";
import { resetSettingsAC } from "../bll/settingsReducer";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.packs.page);
    const countOfPacksOnPage = useAppSelector((state) => state.packs.pageCount).toString();
    const packsTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);

    const cardsPerPage = [5, 10, 15, 20];
    // @ts-ignore
    const pagesCount = Math.ceil(packsTotalCount / countOfPacksOnPage);

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
            <Title title={"Packs list"} buttonName={"Add new pack"} callback={handleOpenAdd} />
            <SettingsBar
                resetPackListFilter={resetPackListFilter}
                currentPage={currentPage}
                countOfPacksOnPage={countOfPacksOnPage}
            />
            <PacksTable />
            <div className={style.paginationAndSelectBlock}>
                <Stack className={style.stack} spacing={4}>
                    <Pagination
                        count={pagesCount}
                        page={currentPage}
                        onChange={changeCurrentPage}
                    />
                </Stack>
                <FormControl sx={{ m: -5, minWidth: 40 }} size="small">
                    <div className={style.spanWithSelect}>
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
                        <span className={style.spanCardsText}> Cards per Page</span>
                    </div>
                </FormControl>
            </div>
            <AddPackModal open={openAdd} setOpen={setOpenAdd} />
        </div>
    );
};
