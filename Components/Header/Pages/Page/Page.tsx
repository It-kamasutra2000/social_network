import React, { } from "react"
import { NavLink } from "react-router-dom"
import s from './Page.module.scss';
import { IconType } from "react-icons";


type PropsType = {
    Icon: IconType
    path: string
    pageName: string
}

export const Page: React.FC<PropsType> = React.memo(({ Icon, path, pageName }) => {

    return (
        <div className={s.page}>
            <NavLink activeClassName={s.active} to={`/${path}`}>
                <Icon />
               <span>{pageName} </span>
            </NavLink>
        </div>
    )
})