import { NavLink, useParams } from "react-router-dom";
import s from "../Cards.module.css";
import navLinkStyle from "../../../f3-packs/ui/PacksTable/PacksTable.module.css";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../../../sc1-main/m2-bll/store";
import { PATH } from "../../../../sc1-main/m1-ui/Main/Pages";
import { LongMenu } from "../../../../sc1-main/m1-ui/common/CustomizedMenu/CustomizedMenu";
import { CircularProgress } from "@mui/material";

export const CardsHeader = (props: { setModalAddCard: (value: boolean) => void }) => {
    const { cardPackID } = useParams<"cardPackID">();
    const cards = useAppSelector((state) => state.cards.cards);
    const packName = useAppSelector((state) => state.cards.packName);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    if (!packName && !cards.length) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={""}>
            <NavLink className={navLinkStyle.navLink} to={PATH.PACKS}>
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
                    disabled={isLoading}
                >
                    Add new card
                </Button>
            </div>
            <div className={s.titleBlock}>Search</div>
            <TextField
                style={{ width: "100%", marginBottom: "30px" }}
                id="outlined-basic"
                label="Provide your text"
                variant="outlined"
            />
        </div>
    );
};
