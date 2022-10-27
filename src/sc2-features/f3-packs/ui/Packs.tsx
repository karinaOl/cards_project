import React, { useEffect, useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useAppDispatch } from "../../../sc1-main/m2-bll/store";
import { addPackTC, getPacksTC } from "../bll/packsReducer";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { PacksTable } from "./PacksTable";
import { Title } from "./Title/Title";
import { SettingsBar } from "./SettingsBar/SettingsBar";
import s from "./Packs.module.css";

export const Packs = () => {
    const dispatch = useAppDispatch();

    const [currentCardsPerPage, setCurrentCardsPerPage] = useState("10");
    const [currentPage, setCurrentPage] = React.useState(1);
    const cardsPerPage = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    // const choosePage = (page: number) => {
    //     const payload: GetCardsPackRequestParamsType = {
    //         page,
    //         pageCount: currentCardsPerPage,
    //     };
    //     // dispatch(getPacksTC(payload));
    // };
    const handleChange = (e: SelectChangeEvent) => {
        setCurrentCardsPerPage(e.target.value);
        const payload = {
            pageCount: e.target.value,
        };
        // dispatch(getPacksTC(payload));
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const addPacks = () => {
        dispatch(addPackTC("TEST_FROM_DELETE"));
    };

    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch]);

    return (
        <div className={s.packs}>
            <Title title={"Packs list"} buttonName={"Add new pack"} callback={addPacks} />
            <SettingsBar />
            <PacksTable />
            {/*{pages.map((currentPage, index) => (*/}
            {/*    <span key={index} onClick={() => choosePage(currentPage)}>*/}
            {/*        {currentPage}*/}
            {/*    </span>*/}
            {/*))}*/}
            <Stack spacing={2}>
                <Typography>Current Page: {currentPage}</Typography>
                <Pagination count={10} page={currentPage} onChange={handleChangePage} />
            </Stack>
            <FormControl sx={{ m: -5, minWidth: 40 }} size="small">
                <Select value={currentCardsPerPage} onChange={handleChange}>
                    {cardsPerPage.map((page, index) => (
                        <MenuItem key={index} value={page}>
                            {page}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/*<span>Cards per Page</span>*/}
        </div>
    );
};
