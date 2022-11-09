import { CardsTable } from "./CardsTable/CardsTable";
import React, { useState } from "react";
import { CardsHeader } from "./CardsHeader/CardsHeader";
import { ModalAddNewCard } from "./ModalCard/AddNewCard";
import { ModalUpdateCard } from "./ModalCard/UpdateCard";
import { ModalDeleteCard } from "./ModalCard/DeleteCard";

export const Cards = () => {
    const [modalAddCard, setModalAddCard] = useState(false);
    const [modalUpdateCard, setModalUpdateCard] = useState(false);
    const [modalDeleteCard, setModalDeleteCard] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cardId, setCardId] = useState("");

    return (
        <div>
            <CardsHeader setModalAddCard={setModalAddCard} />
            <CardsTable
                setCardId={setCardId}
                setModalDeleteCard={setModalDeleteCard}
                setModalUpdateCard={setModalUpdateCard}
                setQuestion={setQuestion}
                setAnswer={setAnswer}
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
