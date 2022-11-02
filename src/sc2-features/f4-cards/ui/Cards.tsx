import { CardsTable } from "./CardsTable/CardsTable";
import { Title } from "../../../sc1-main/m1-ui/common/Title/Title";
import { addCardTC } from "../bll/cardsReducer";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { NavLink, useParams } from "react-router-dom";
import s from "./Cards.module.css";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import { CustomizedMenus } from "../../../sc1-main/m1-ui/common/Customized Menus/CustomizedMenus";
import style from "../../f5-learnPage/ui/LearnPage.module.css";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";

export const Cards = () => {
    const dispatch = useAppDispatch();

    const { cardPackID } = useParams<"cardPackID">();

    const packs = useAppSelector((state) => state.packs.cardPacks);
    const validPack = packs.find((elem) => elem._id === cardPackID);
    const packName = validPack ? validPack.name : "Default Name";

    const addCard = () => {
        dispatch(
            addCardTC({
                card: {
                    cardsPack_id: cardPackID as string,
                    question: "Test question",
                    answer: "Test answer",
                },
            })
        );
    };

    return (
        <div>
            <NavLink className={style.navLink} to={PATH.PACKS}>
                ⇦ Back to Pack List
            </NavLink>
            <div className={s.cards}>
                <Title title={packName} buttonName={"Add new card"} callback={addCard} />
                <CustomizedMenus />
                <div className={s.titleBlock}>Search</div>
                <TextField
                    className={s.input}
                    id="outlined-basic"
                    label="Provide your text"
                    variant="outlined"
                />
                <CardsTable />
            </div>
        </div>
    );
};
