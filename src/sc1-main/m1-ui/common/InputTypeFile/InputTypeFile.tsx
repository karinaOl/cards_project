// import React, { ChangeEvent } from "react";
// import { IconButton } from "@mui/material";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { useAppDispatch, useAppSelector } from "../../../m2-bll/store";
// import {
//     updateUserAC,
//     updateUserAvatarTC,
// } from "../../../../sc2-features/f2-profile/bll/profileReducer";
//
// export const InputTypeFile = () => {
//     const dispatch = useAppDispatch();
//     const name = useAppSelector((state) => state.profile.name);
//
//     const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files.length) {
//             const file = e.target.files[0];
//
//             const fileSize = file.size;
//             const fileSizeInMb = fileSize / 1024 ** 2;
//
//             if (fileSizeInMb < 1) {
//                 convertFileToBase64(file, (file64: string) => {
//                     dispatch(updateUserAC({ name, avatar: file64 }));
//                     dispatch(updateUserAvatarTC(file64));
//                 });
//             } else {
//                 console.error("Error: ", "Файл слишком большого размера");
//             }
//         }
//     };
//
//     const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const file64 = reader.result as string;
//             callBack(file64);
//         };
//         reader.readAsDataURL(file);
//     };
//
//     return (
//         <label>
//             <input
//                 type="file"
//                 onChange={uploadHandler}
//                 style={{ display: "none" }}
//                 accept="image/*"
//             />
//             <IconButton component="span">
//                 <PhotoCameraIcon />
//             </IconButton>
//         </label>
//     );
// };

import React, { ChangeEvent, useState } from "react";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import defaultAva from "../../../../assets/images/profile-img.png";
import { useAppDispatch, useAppSelector } from "../../../m2-bll/store";
import {
    updateUserAC,
    updateUserAvatarTC,
} from "../../../../sc2-features/f2-profile/bll/profileReducer";

export const InputTypeFile = () => {
    const avatar = useAppSelector((state) => state.profile.avatar);
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.profile.name);
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const [ava, setAva] = useState(avatar);
    const [isAvaBroken, setIsAvaBroken] = useState(false);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            const fileSize = file.size;
            const fileSizeInMb = fileSize / 1024 ** 2;

            if (fileSizeInMb < 0.2) {
                convertFileToBase64(file, (file64: string) => {
                    setIsAvaBroken(false);
                    setAva(file64);
                    dispatch(updateUserAC({ name, avatar: file64 }));
                    dispatch(updateUserAvatarTC(file64));
                });
            } else {
                alert("File size should be no more than 1 mb ");
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

    const errorHandler = () => {
        setIsAvaBroken(true);
        alert("Broken img. Default Img has set");
    };

    return (
        <div>
            <img
                src={isAvaBroken ? defaultAva : ava!!}
                style={{ width: "180px", height: "180px", borderRadius: "50%" }}
                onError={errorHandler}
                alt="ava"
            />
            <label>
                <input
                    type="file"
                    onChange={uploadHandler}
                    accept="image/*"
                    style={{ display: "none" }}
                />
                <IconButton disabled={isLoading} component="span">
                    <CloudUploadIcon />
                </IconButton>
            </label>
        </div>
    );
};
