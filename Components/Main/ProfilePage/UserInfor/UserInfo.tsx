import React, { useEffect, useState } from "react"
import s from "./UserInfo.module.scss";
import { UserPhoto } from "./UserPhoto/UserPhoto";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, getUser } from "../../../../Redux/Profile-Reducer";
import { selectProfile } from "../../../../Redux/selectors/profile-selector";
import { Preloader } from "../../../Common/Preloader/Preloader";
import { ProfileType } from "../../../../types/types";
import { selectUserId } from "../../../../Redux/selectors/auth-selector";
import { useParams } from "react-router";
import { ProfileData } from "./ProfileData/ProfileData";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";
import { useHistory } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';


export type ParamTypes = {
    userId: string
}

export const UserInfo: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const profile = useSelector(selectProfile) as ProfileType
    const AuthUserId = useSelector(selectUserId)
    const history = useHistory()
    const { userId } = useParams<ParamTypes>()

    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }

    useEffect(() => {
        let userIdFromUrl = Number(userId);
        if (userIdFromUrl) {
            dispatch(getUser(userIdFromUrl))
            dispatch(getStatus(userIdFromUrl))
        } else if (AuthUserId) {
            dispatch(getUser(AuthUserId))
            dispatch(getStatus(AuthUserId))
        } else {
            history.push('/login')
        }
    }, [dispatch, AuthUserId, userId, history])


    if (!profile) {
        return <Preloader styles={'profilePre'} />
    }

   

    return (
        <div className={s.aboutUser}>
            <UserPhoto isOwner={!userId} img={profile.photos?.large} />
            <div>
            {!editMode && <ProfileData activateEditMode={activateEditMode}/>}
          
            </div>
            {editMode &&  <ProfileDataForm deActivateEditMode={deActivateEditMode} editMode={editMode}/>}
        </div>
    )
})

