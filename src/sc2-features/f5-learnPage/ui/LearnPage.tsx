import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { Navigate, NavLink, useParams } from "react-router-dom";
import style from "./LearnPage.module.css";
import { getCardsTC } from "../../f4-cards/bll/cardsReducer";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { CircularProgress } from "@mui/material";
import { CardsForLearning } from "./CardsForLearning";

export const LearnPage = () => {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const packName = useAppSelector((state) => state.cards.packName);
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams<{ cardPackID: string }>();

    useEffect(() => {
        if (cardPackID) dispatch(getCardsTC({ cardsPack_id: cardPackID }));
    }, [cardPackID, dispatch]);

    if (!packName) {
        return (
            <div className="circularProgress">
                <CircularProgress />
            </div>
        );
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;

    return (
        <div>
            <span>
                <NavLink className={style.navLink} to={PATH.PACKS}>
                    ⇦ Back to Pack List
                </NavLink>
            </span>
            <h2>Learn "{packName}"</h2>
            <CardsForLearning />
        </div>
    );
};
