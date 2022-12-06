import React, { ChangeEvent } from "react";
import { Button } from "@mui/material";
import { setAppErrorAC } from "../../../../sc1-main/m2-bll/appReducer";
import { useAppDispatch } from "../../../../sc1-main/m2-bll/store";

type InputTypeFilePacksPropsType = {
    setCover: (cover: string) => void;
    name: string;
};

export const InputTypeFilePacks = (props: InputTypeFilePacksPropsType) => {
    const dispatch = useAppDispatch();

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            const fileSize = file.size;
            const fileSizeInMb = fileSize / 1024 ** 2;

            if (fileSizeInMb < 1) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(setAppErrorAC(null));
                    props.setCover(file64);
                });
            } else {
                dispatch(setAppErrorAC("Image is too large!"));
            }
        }
    };

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <label>
                <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
                <Button variant="contained" component="span">
                    {props.name}
                </Button>
            </label>
        </>
    );
};
