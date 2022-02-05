import { Button } from 'antd';
import React from 'react';
import { PhotosType } from '../../../../types/types';
import s from './User.module.scss';
import spareUserPhoto from '../../../../images/img.jpg'
import { NavLink } from 'react-router-dom';
import { actions, follow, unFollow } from '../../../../Redux/User-Reducer';
import { useDispatch } from 'react-redux';
import { History } from 'history';

// this type must be here for this code below to work
interface IUserProps {
    id: number
    userName: string | null
    status: string | null
    photos: PhotosType
    followed: boolean
    followingInProgress: number[]
    isAuth: boolean
    history: History
}

export const User: React.FC<IUserProps> = React.memo(({ id, userName, status, photos, followed, followingInProgress, history, isAuth }) => {

    const dispatch = useDispatch()

    const followUnFollow = (followedStatus: string, action: (userId: number) => void) => {
        return  <div className={s.button + " " + s[followedStatus]}>
        <Button disabled={followingInProgress.some((FPId) => FPId === id)} onClick={() => {
            if (!isAuth) {
                history.push('./login')
                return
            }
            dispatch(action(id))
            dispatch(actions.setFollowInProgress(id, true))
        }}>
            {followedStatus}
        </Button>
    </div>
    }

    let button;
    if (followed) {
        button = followUnFollow('unFollow', unFollow)
    } else {
        button = followUnFollow('follow', follow)
    }

    return (
        <div className={s.user}>
            <div className={s.userInfo}>
                <div className={s.rightBlock}>
                    <div className={s.img}>
                        <NavLink to={`/profile/${id}`}>
                            <img src={ photos.large ?  photos.large : spareUserPhoto} alt={'userPhoto'} />
                        </NavLink>
                    </div>
                    {button}
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

