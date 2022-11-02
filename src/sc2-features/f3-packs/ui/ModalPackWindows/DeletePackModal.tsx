import { BasicModal } from "../../../BasicModal/BasicModal";
import Button from "@mui/material/Button";
import { deletePackTC } from "../../bll/packsReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";

type AddPackModalPropsType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    packId: string;
    cardsPackName: string;
};

export const DeletePackModal = (props: AddPackModalPropsType) => {
    const dispatch = useAppDispatch();

    const onClickDeleteCardsPackHandler = () => {
        dispatch(deletePackTC(props.packId));
        handleClose();
    };

    const handleClose = () => props.setOpen(false);
    return (
        <BasicModal title={"Delete Pack"} open={props.open} setOpen={props.setOpen}>
            <div>
                <p>Do you really want to remove {props.cardsPackName}?</p>
                <p>All card will be delete.</p>
            </div>
            <div>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={onClickDeleteCardsPackHandler}>
                    Delete
                </Button>
            </div>
        </BasicModal>
    );
};
