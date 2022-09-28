import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import style from "./Button.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? style.red : style.default} ${className ? className : ''}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}
