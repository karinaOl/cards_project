import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from "react";
import style from "./InputText.module.css";

type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanClassName?: string;
};

export const SuperInputText: React.FC<SuperInputTextPropsType> = ({
    type,
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,

    ...restProps // все остальные пропсы попадут в объект restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);

        onChangeText && onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter && e.key === "Enter" && onEnter();
    };

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `${style.superInput} ${error ? style.errorInput : ""} ${
        className ? className : ""
    }`; // need to fix with (?:) and s.superInput

    return (
        <>
            <input
                type={"text"}
                onChange={onChangeCallback}
                onKeyDown={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    );
};
