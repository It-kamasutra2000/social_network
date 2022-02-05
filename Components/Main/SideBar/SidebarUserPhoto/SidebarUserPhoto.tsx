import React from "react"
import s from './SidebarUserPhoto.module.scss'
import userPhoto from '../../../../images/img.jpg'

export const SidebarUserPhoto: React.FC<SidebarUserPhotoType> = React.memo(({img}) => {
    return (
        <div className={s.userPhoto}>
            <img src={img ? img : userPhoto} alt={'authorized user'} />
        </div>
    )
})