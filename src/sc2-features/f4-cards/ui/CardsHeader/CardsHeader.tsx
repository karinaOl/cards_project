import { NavLink, useParams } from "react-router-dom";
import s from "../Cards.module.css";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import { LongMenu } from "../../../../sc1-main/m1-ui/common/CustomizedMenu/CustomizedMenu";
import { CircularProgress } from "@mui/material";

export const CardsHeader = (props: { setModalAddCard: (value: boolean) => void }) => {
    const { cardPackID } = useParams<"cardPackID">();

    const packName = useAppSelector((state) => state.cards.packName);

    if (!packName) {
        return (
            <div className="circularProgress">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={s.cards}>
            <NavLink className={s.goBack} to={PATH.PACKS}>
                ← Back to Packs List
            </NavLink>
            <div className={s.title}>
                <div className={s.item}>
                    <h2>{packName}</h2>
                    <LongMenu cardPackId={cardPackID} />
                </div>
                <Button
                    className={s.button}
                    onClick={() => props.setModalAddCard(true)}
                    variant={"contained"}
                >
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
        </div>
    );
};
