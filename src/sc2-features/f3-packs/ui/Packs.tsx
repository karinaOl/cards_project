import { addPackTC, deletePackTC, getPacksTC } from "../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { useEffect } from "react";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector((state) => state.packs.packs);

    console.log(packs);
    const addPacks = () => {
        dispatch(addPackTC("TEST_FROM_DELETE"));
    };

    const deletePacks = () => {
        dispatch(deletePackTC("6356b38d65c36e000499fa36"));
    };

    useEffect(() => {
        dispatch(getPacksTC());
    }, []);

    return (
        <>
            <button onClick={addPacks}>+</button>
            <button onClick={deletePacks}>-</button>;
        </>
    );
};
