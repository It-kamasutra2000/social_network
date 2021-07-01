import React from "react"
import s from './Friend.module.scss'
import sparePhoto from '../../../../../images/img.jpg'
import { PhotosType } from "../../../../../types/types"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectFollowingInProgress } from "../../../../../Redux/selectors/user-selector"
import { actions } from "../../../../../Redux/User-Reducer"
import { deleteFriend } from "../../../../../Redux/Sidebar-Reducer"
import { Dropdown, Button } from 'antd';
import { useShowMore } from "../../../../../hooks/useShowMore"


interface IPropsType {
    photos: PhotosType
    id: number
    name: string
}


export const Friend: React.FC<IPropsType> = React.memo(({ photos, id, name }) => {


    let {
        fullText: fullFriendName, menu, showFullText: showFullFriendName,
        isTextBig: isFriendNameBig, shortText: shortFriendName
    } = useShowMore(name, 10, 'Friend')


    const friendPhoto = photos.small
    const followingInProgress = useSelector(selectFollowingInProgress)
    const dispatch = useDispatch()


    let friendName = name 
    if(isFriendNameBig) {
        friendName = shortFriendName
    } else {
        friendName = fullFriendName
    }

    return (
        <div className={s.friend}>
            <div className={s.imgAndName}>
                <div className={s.img}>
                    <NavLink to={`/profile/${id}`}>
                        <img src={friendPhoto ? friendPhoto : sparePhoto} alt={'friendPhoto'} />
                    </NavLink>
                </div>
                <div className={s.nameLink}>
                    <NavLink to={`/profile/${id}`}>
                        {showFullFriendName ? fullFriendName : friendName}
                        <span className={s.showMore}>{isFriendNameBig
                            ? <Dropdown overlay={menu} placement="topCenter">
                                <span>...</span>
                            </Dropdown>
                            : null}</span>
                    </NavLink>
                </div>
            </div>
            <Button disabled={followingInProgress.some((selectedId) => selectedId === id)} onClick={() => {
                dispatch(deleteFriend(id))
                dispatch(actions.setFollowInProgress(id, true))
            }}>
                delete
            </Button>
        </div>
    )
})