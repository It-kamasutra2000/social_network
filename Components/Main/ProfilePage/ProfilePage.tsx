import React from 'react';
import s from "./ProfilePage.module.scss";
import { UserInfo } from './UserInfor/UserInfo';
import mainPhoto from '../../../images/mainImg.jpg'
import '../../../App.css';

export const ProfilePage: React.FC = React.memo(() => {
    return (
        <div className={s.profilePage}>
            <div className={s.mainImg}>
                <img src={mainPhoto} alt={'mainImg'}/>
            </div>
            <div className={s.contentBottom}>
                <UserInfo />
            </div>
        </div>
    )
})