import React, { FC } from 'react';

import s from "./ProfilePage.module.scss";
import { UserInfo } from './UserInfor/UserInfo';
import mainPhoto from '../../../images/mainImg.jpg'
import '../../../App.css';

export const ProfilePage: FC = React.memo(() => {
    return (
        <div className={s.profilePage}>
            <div className={s.mainImg}>
                <img src={mainPhoto} alt={'mainImg'}/>
            </div>
            <div data-testid="UserInfo_wrapper" className={s.contentBottom}>
                <UserInfo />
            </div>
        </div>
    )
})