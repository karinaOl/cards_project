import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.css'
import profileImg from './../../../assets/images/profile-img.png'
import TextField from '@mui/material/TextField/TextField';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {logoutTC} from "../bll/profileReducer";

export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return (
        <div className={style.profile}>
            <h1>Personal information</h1>
            <img className={style.profileImg}
                 src={profileImg}
                 alt='profileImg'
            />
            <h3><EditableName/></h3>
            <div>Email</div>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

const EditableName = () => {

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState('User Name')

    const activateEditMode = () => {
        setEdit(true)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const activateViewMode = () => {
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
