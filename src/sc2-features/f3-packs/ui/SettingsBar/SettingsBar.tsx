import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./SettingsBar.module.css";
import Box from "@mui/material/Box";
import { ButtonGroup, Slider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField/TextField";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useDebounce } from "../../../../utils/useDebounce/useDebounceHook";
import { useAppDispatch, useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { findPackByNameAC, getPacksTC, setCardsCountAC, setUserIdAC } from "../../bll/packsReducer";
import { GetCardsPackRequestParamsType } from "../../dal/packs-api";
import IconButton from "@mui/material/IconButton";

function valuetext(value: number) {
    return `${value}°C`;
}

type SettingsBarType = {
    currentPage?: number;
    countOfPacksOnPage?: string;
    resetPackListFilter: (data: GetCardsPackRequestParamsType) => void;
};

export const SettingsBar = (props: SettingsBarType) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.profile._id);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    const [sliderValue, setSliderValue] = React.useState<number[]>([0, 100]);

    const [debounceValue, setDebounceValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(debounceValue, 500);

    const debounceHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDebounceValue(event.target.value);
        dispatch(findPackByNameAC(event.target.value));
    };

    const sliderHandleChange = async (event: Event, newValue: number | number[] | any) => {
        setSliderValue(newValue as number[]);
        dispatch(setCardsCountAC(newValue));
        dispatch(getPacksTC());
    };
    const resetFilter = async () => {
        setDebounceValue("");
        await setSliderValue([0, 100]);
        dispatch(setCardsCountAC([0, 100]));
        dispatch(findPackByNameAC(""));
        dispatch(getPacksTC());
    };

    const [activeMy, setActiveMy] = useState(false);
    const [activeAll, setActiveAll] = useState(true);

    useEffect(() => {
        // if (userId) dispatch(setUserIdAC(userId)); // выводит сразу мои колоды
        dispatch(getPacksTC());
    }, [
        dispatch,
        debouncedValue,
        props.currentPage,
        props.countOfPacksOnPage,
        activeMy,
        activeAll,
        userId,
    ]);

    const onMyPacksHandler = () => {
        setActiveAll(false);
        setActiveMy(true);
        if (userId) dispatch(setUserIdAC(userId));
    };
    const onAllPacksHandler = () => {
        setActiveMy(false);
        setActiveAll(true);
        dispatch(setUserIdAC(""));
    };

    return (
        <div className={s.settingsBar}>
            <Box className={s.itemBlock}>
                <div className={s.titleBlock}>Search</div>
                <TextField
                    type="text"
                    value={debounceValue}
                    onChange={debounceHandleChange}
                    className={s.input}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    disabled={isLoading}
                />
            </Box>
            <Box>
                <div className={s.titleBlock}>Show packs cards</div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button
                        variant={activeMy ? "contained" : "outlined"}
                        onClick={onMyPacksHandler}
                        disabled={isLoading}
                    >
                        My
                    </Button>
                    <Button
                        variant={activeAll ? "contained" : "outlined"}
                        onClick={onAllPacksHandler}
                        disabled={isLoading}
                    >
                        All
                    </Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ width: 300 }}>
                <div className={s.titleBlock}>Number of cards</div>
                <div className={s.slider}>
                    <span>{sliderValue[0]}</span>
                    <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={sliderValue}
                        onChange={sliderHandleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disabled={isLoading}
                    />
                    <span>{sliderValue[1]}</span>
                </div>
            </Box>
            <IconButton disabled={isLoading} onClick={resetFilter}>
                <FilterAltRoundedIcon />
            </IconButton>
        </div>
    );
};
