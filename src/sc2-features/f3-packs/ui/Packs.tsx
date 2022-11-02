import React, { ChangeEvent, useEffect, useState } from "react";
import {
    ButtonGroup,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Slider,
    Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import {
    addPackTC,
    changeCountOfPacksOnPageAC,
    changeCurrentPageAC,
    findPackByNameAC,
    getPacksTC,
} from "../bll/packsReducer";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { PacksTable } from "./PacksTable/PacksTable";
import { Title } from "../../../sc1-main/m1-ui/common/Title/Title";
import style from "./Packs.module.css";
import s from "./SettingsBar/SettingsBar.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useDebounce } from "../../../utils/useDebounce/useDebounceHook";

export const Packs = () => {
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

    const addPacks = () => {
        dispatch(addPackTC("TEST_FROM_DELETE"));
    };

    // SettingBar Component

    const [value, setValue] = React.useState<number[]>([20, 37]);

    const [debounceValue, setDebounceValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(debounceValue, 700);

    const debounceHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDebounceValue(event.target.value);
        dispatch(findPackByNameAC(event.target.value));
    };

    const sliderHandleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}°C`;
    }

    //

    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, debouncedValue, currentPage, countOfPacksOnPage]);

    return (
        <div className={style.packs}>
            <Title title={"Packs list"} buttonName={"Add new pack"} callback={addPacks} />
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

            <PacksTable />
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
        </div>
    );
};
