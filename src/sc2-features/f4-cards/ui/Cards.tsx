import { CardsTable } from "./CardsTable/CardsTable";
import { NavLink } from "react-router-dom";
import s from "./Cards.module.css";
import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { LongMenu } from "../../../sc1-main/m1-ui/common/CustomizedMenu/CustomizedMenu";
import { AddNewCard } from "./ModalCard/AddNewCard";

export const Cards = () => {
    const [openAdd, setOpenAdd] = useState(false);

    return (
        <div className={s.cards}>
            <NavLink className={s.goBack} to={PATH.PACKS}>
                ← Back to Packs List
            </NavLink>
            <div className={s.title}>
                <div className={s.item}>
                    <h2>My Pack</h2>
                    <LongMenu />
                </div>
                <Button className={s.button} onClick={() => setOpenAdd(true)} variant={"contained"}>
                    Add new card
                </Button>
            </div>
            <div className={s.titleBlock}>Search</div>
            <TextField
                className={s.input}
                id="outlined-basic"
                label="Provide your text"
                variant="outlined"
            />
            <br />
            <CardsTable />
            <AddNewCard open={openAdd} setOpen={setOpenAdd} />
        </div>
    );
};
