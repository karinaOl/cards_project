import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styles from "./BasicModal.module.css";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

type BasicModalPropsType = {
    children: ReactNode;
    title: string;
    open: boolean;
    setOpen: (value: boolean) => void;
};

export const BasicModal = (props: BasicModalPropsType) => {
    const onClickHandler = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 className={styles.title}>
                        {props.title}
                        <Button variant="outlined" size="small" onClick={onClickHandler}>
                            Close
                        </Button>
                    </h2>
                    {props.children}
                </Box>
            </Modal>
        </div>
    );
};
