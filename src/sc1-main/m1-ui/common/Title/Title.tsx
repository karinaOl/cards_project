import Button from "@mui/material/Button";
import * as React from "react";
import s from "./Title.module.css";
import { FC } from "react";
import { useAppSelector } from "../../../m2-bll/store";

export const Title: FC<{
    title: string;
    buttonName: string;
    callback?: (a: any) => any;
}> = ({ title, buttonName, callback }) => {
    const isLoading = useAppSelector((state) => state.app.isLoading);

    return (
        <div className={s.title}>
            <h2>{title}</h2>
            {callback ? (
                <Button
                    disabled={isLoading}
                    className={s.button}
                    onClick={callback}
                    variant={"contained"}
                >
                    {buttonName}
                </Button>
            ) : (
                <span></span>
            )}
        </div>
    );
};
