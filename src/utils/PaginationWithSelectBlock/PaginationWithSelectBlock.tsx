import React from "react";
import { Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useAppSelector } from "../../sc1-main/m2-bll/store";
import FormControl from "@mui/material/FormControl";
import style from "../PaginationWithSelectBlock/PaginationWithSelectBlock.module.css";
import MenuItem from "@mui/material/MenuItem";

export type PaginationWithSelectBlockPropsType = {
    currentPage: number;
    countOfEssenceOnPage: number;
    essenceTotalCount: number;
    changeCountOfEssenceOnPage: (e: SelectChangeEvent) => void;
    changeCurrentPage: (event: React.ChangeEvent<unknown>, value: number) => void;
    text: string;
};
export const PaginationWithSelectBlock = (props: PaginationWithSelectBlockPropsType) => {
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const cardsPerPage = [5, 10, 15, 20];

    const pagesCount = Math.ceil(props.essenceTotalCount / props.countOfEssenceOnPage);

    return (
        <div className={style.paginationAndSelectBlock}>
            <Stack className={style.stack} spacing={4}>
                <Pagination
                    count={pagesCount}
                    page={props.currentPage}
                    onChange={props.changeCurrentPage}
                    disabled={isLoading}
                />
            </Stack>
            <FormControl sx={{ m: -5, minWidth: 40 }} size="small">
                <div className={style.spanWithSelect}>
                    <span className={style.showSpanText}>Show</span>
                    <Select
                        value={props.countOfEssenceOnPage.toString()}
                        onChange={props.changeCountOfEssenceOnPage}
                        style={{ top: "2px" }}
                        sx={{ top: "2px" }}
                        disabled={isLoading}
                    >
                        {cardsPerPage.map((page, index) => (
                            <MenuItem key={index} value={page}>
                                {page}
                            </MenuItem>
                        ))}
                    </Select>
                    <span className={style.spanCardsText}>{props.text}</span>
                </div>
            </FormControl>
        </div>
    );
};
