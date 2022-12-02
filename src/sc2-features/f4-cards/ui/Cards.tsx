import { CardsTable } from "./CardsTable/CardsTable";
import React, { useState } from "react";
import { CardsHeader } from "./CardsHeader/CardsHeader";
import { ModalAddNewCard } from "./ModalCard/AddNewCard";
import { ModalUpdateCard } from "./ModalCard/UpdateCard";
import { ModalDeleteCard } from "./ModalCard/DeleteCard";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { Navigate, useParams } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import style from "../ui/Cards.module.css";
import { PaginationWithSelectBlock } from "../../f3-packs/ui/Packs";
import { getCardsTC } from "../bll/cardsReducer";
import { SelectChangeEvent } from "@mui/material";

export const Cards = () => {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
    const { cardPackID } = useParams();
    const [modalAddCard, setModalAddCard] = useState(false);
    const [modalUpdateCard, setModalUpdateCard] = useState(false);
    const [modalDeleteCard, setModalDeleteCard] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cardId, setCardId] = useState("");

    const currentPage = useAppSelector((state) => state.cards.page);
    const countOfPacksOnPage = useAppSelector((state) => state.cards.pageCount);
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount);
    const changeCountOfCardsOnPage = (e: SelectChangeEvent) => {
        dispatch(getCardsTC({ cardsPack_id: cardPackID!!, pageCount: +e.target.value }));
    };
    const changeCurrentPage = async (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getCardsTC({ cardsPack_id: cardPackID!!, page: value }));
    };

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;

    return (
        <div className={style.cards}>
            <CardsHeader setModalAddCard={setModalAddCard} />
            <CardsTable
                setCardId={setCardId}
                setModalDeleteCard={setModalDeleteCard}
                setModalUpdateCard={setModalUpdateCard}
                setQuestion={setQuestion}
                setAnswer={setAnswer}
            />
            <PaginationWithSelectBlock
                currentPage={currentPage}
                countOfEssenceOnPage={countOfPacksOnPage}
                essenceTotalCount={cardsTotalCount}
                changeCountOfEssenceOnPage={changeCountOfCardsOnPage}
                changeCurrentPage={changeCurrentPage}
                text="Cards per Page"
            />
            {modalAddCard && (
                <ModalAddNewCard modalAddCard={modalAddCard} setModalAddCard={setModalAddCard} />
            )}
            {modalUpdateCard && (
                <ModalUpdateCard
                    answer={answer}
                    question={question}
                    cardId={cardId}
                    modalUpdateCard={modalUpdateCard}
                    setModalUpdateCard={setModalUpdateCard}
                />
            )}
            {modalDeleteCard && (
                <ModalDeleteCard
                    modalDeleteCard={modalDeleteCard}
                    setModalDeleteCard={setModalDeleteCard}
                    question={question}
                    cardId={cardId}
                />
            )}
        </div>
    );
};
