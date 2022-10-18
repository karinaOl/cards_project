import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.css'
import profileImg from './../../../assets/images/profile-img.png'
import TextField from '@mui/material/TextField/TextField';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {updateUserNameTC, logoutTC} from "../bll/profileReducer";
import Button from "@mui/material/Button";

export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const email = useAppSelector(state => state.profile.email)
    const name = useAppSelector(state => state.profile.name)
    // avatar
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    const changeName = (name: string) => {
        dispatch(updateUserNameTC(name))
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <div className={style.profile}>
            <h1>Personal information</h1>
            <img className={style.profileImg}
                 src={profileImg}
                 alt='profileImg'
            />
            <h3>
                <EditableName name={name}
                              changeName={changeName}
                />
            </h3>
            <p>{email}</p>
            <Button variant="outlined" onClick={logoutHandler}>Logout</Button>
        </div>
    )
}

const EditableName = (props: EditableNamePropsType) => {

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.name)

    const activateEditMode = () => {
        setEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const activateViewMode = () => {
        props.changeName(text)
        setEdit(false)
    }

    return (
        <div>
            {edit
                ? <TextField autoFocus onBlur={activateViewMode} value={text} onChange={onChangeHandler} type="text"/>
                : <span onDoubleClick={activateEditMode}>{text} </span>}
            <BorderColorOutlinedIcon onClick={activateEditMode}/>
        </div>

    )
}

export type EditableNamePropsType = {
    name: string
    changeName: (name: string) => void
}
