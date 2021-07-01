import { Button } from 'antd';
import React from 'react';
import { PhotosType } from '../../../../types/types';
import s from './User.module.scss';
import spareUserPhoto from '../../../../images/img.jpg'
import { NavLink } from 'react-router-dom';
import { actions, follow, unFollow } from '../../../../Redux/User-Reducer';
import { useDispatch } from 'react-redux';

type PropsType = {
    id: number
    userName: string | null
    status: string | null
    photos: PhotosType
    followed: boolean
    followingInProgress: number[]
    isAuth: boolean
}

export const User: React.FC<PropsType> = React.memo(({ id, userName, status, photos, followed, followingInProgress, isAuth }) => {

    const dispatch = useDispatch()

    const userPhoto = photos.large
    

    let button;

    if (followed) {
        button = <div className={s.button + " " + s.follow}>
            <Button disabled={followingInProgress.some((FPId) => FPId === id)} onClick={() => {
                dispatch(unFollow(id))
                dispatch(actions.setFollowInProgress(id, true))
            }}>
                follow
            </Button>
        </div>
    } else {
        button = <div className={s.button + " " + s.unFollow}>
            <Button disabled={followingInProgress.some((FPId) => FPId === id)} onClick={() => {
                dispatch(follow(id))
                dispatch(actions.setFollowInProgress(id, true))
            }}>
                unFollow
            </Button>
        </div>
    }


    return (
        <div className={s.user}>
            <div className={s.userInfo}>
                <div className={s.rightBlock}>
                    <div className={s.img}>
                        <NavLink to={`/profile/${id}`}>
                            <img src={userPhoto ? userPhoto : spareUserPhoto} alt={'userPhoto'} />
                        </NavLink>
                    </div>
                    {isAuth ? button : null}
                </div>
                <div className={s.leftBlock}>
                    <div className={s.userName}>
                        <NavLink to={`/profile/${id}`}>
                            <span> {userName}</span>
                        </NavLink>
                    </div>
                    <div className={s.status}>
                        status: {status ? status : '....'}
                    </div>
                </div>
            </div>
            <div className={s.bottomLine}></div>
        </div>
    )
})

