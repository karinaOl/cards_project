import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./SettingsBar.module.css";
import Box from "@mui/material/Box";
import { ButtonGroup, Slider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField/TextField";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useDebounce } from "../../../../utils/useDebounce/useDebounceHook";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";
import { findPackByNameAC, getPacksTC } from "../../bll/packsReducer";

function valuetext(value: number) {
    return `${value}°C`;
}

export const SettingsBar = () => {
    const dispatch = useAppDispatch();

    const [value, setValue] = React.useState<number[]>([20, 37]);

    const [debounceValue, setDebounceValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(debounceValue, 500);

    const debounceHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDebounceValue(event.target.value);
        dispatch(findPackByNameAC(event.target.value));
    };

    const sliderHandleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    useEffect(() => {
        console.log("render");
        if (debounceValue) {
            dispatch(getPacksTC());
        }
    }, [dispatch, debouncedValue]);

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
                />
            </Box>
            <Box>
                <div className={s.titleBlock}>Show packs cards</div>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button>My</Button>
                    <Button>All</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ width: 300 }}>
                <div className={s.titleBlock}>Number of cards</div>
                <div className={s.slider}>
                    <span>{value[0]}</span>
                    <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        onChange={sliderHandleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                    <span>{value[1]}</span>
                </div>
            </Box>
            <FilterAltRoundedIcon />
        </div>
    );
};
