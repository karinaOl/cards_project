import React from "react";
import s from "./SettingsBar.module.css";
import Box from "@mui/material/Box";
import { ButtonGroup, Slider } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField/TextField";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

function valuetext(value: number) {
    return `${value}°C`;
}

export const SettingsBar = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={s.settingsBar}>
            <Box className={s.itemBlock}>
                <div className={s.titleBlock}>Search</div>
                <TextField
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
                        onChange={handleChange}
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
