import React, { ChangeEvent } from "react";
import { IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useAppDispatch, useAppSelector } from "../../../m2-bll/store";
import {
    updateUserAC,
    updateUserAvatarTC,
} from "../../../../sc2-features/f2-profile/bll/profileReducer";

export const InputTypeFile = () => {
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.profile.name);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            const fileSize = file.size;
            const fileSizeInMb = fileSize / 1024 ** 2;

            if (fileSizeInMb < 1) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(updateUserAC({ name, avatar: file64 }));
                    dispatch(updateUserAvatarTC(name));
                });
            } else {
                console.error("Error: ", "Файл слишком большого размера");
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
        <label>
            <input
                type="file"
                onChange={uploadHandler}
                style={{ display: "none" }}
                accept="image/*"
            />
            <IconButton component="span">
                <PhotoCameraIcon />
            </IconButton>
        </label>
    );
};
