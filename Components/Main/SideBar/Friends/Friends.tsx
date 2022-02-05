import React from "react"
import { useSelector } from "react-redux"

import { selectFriends } from "../../../../Redux/selectors/sideBar-selector"
import s from './Friends.module.scss'
import {Friend} from './Friend/Friend'


export const Friends: React.FC = React.memo(() => {
    
    const friends = useSelector(selectFriends)

    const friendElements = friends.map((f) => <Friend key={f.id} photos={f.photos} name={f.name} id={f.id}/>)

    return (
        <div className={s.SidBaFriends}>
            <h2>
                friends
            </h2>
            <div className={s.test}>
            <div className={s.friends}>
                {friendElements}
            </div>
            </div>
        </div>
    )
})