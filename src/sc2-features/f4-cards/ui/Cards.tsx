import { CardsTable } from "./CardsTable/CardsTable";
import { NavLink, useParams } from "react-router-dom";
import s from "./Cards.module.css";
import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { LongMenu } from "../../../sc1-main/m1-ui/common/CustomizedMenu/CustomizedMenu";
import { AddNewCard } from "./ModalCard/AddNewCard";
import { useAppSelector } from "../../../sc1-main/m2-bll/store";

export const Cards = () => {
    const [openAdd, setOpenAdd] = useState(false);

    const { cardPackID } = useParams<"cardPackID">();
    const packName = useAppSelector((state) => state.cards.packName);

    return (
        <div className={s.cards}>
            <span>
                <NavLink className={s.goBack} to={PATH.PACKS}>
                    ← Back to Packs List
                </NavLink>
            </span>
            <div className={s.title}>
                <div className={s.item}>
                    <h2>{packName}</h2>
                    <LongMenu cardPackId={cardPackID} />
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
