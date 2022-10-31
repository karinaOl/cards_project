import Button from "@mui/material/Button";
import * as React from "react";
import s from "./Title.module.css";
import { FC } from "react";

export const Title: FC<{
    title: string;
    buttonName: string;
    callback?: (a: any) => any;
}> = ({ title, buttonName, callback }) => {
    return (
        <div className={s.title}>
            <h2>{title}</h2>
            {callback ? (
                <Button className={s.button} onClick={callback} variant={"contained"}>
                    {buttonName}
                </Button>
            ) : (
                <span></span>
            )}
        </div>
    );
};
