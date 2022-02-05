import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import s from "./UserInfo.module.scss";
import { UserPhoto } from "./UserPhoto/UserPhoto";
import { getStatus, getUser } from "../../../../Redux/Profile-Reducer";
import { selectProfile } from "../../../../Redux/selectors/profile-selector";
import { Preloader } from "../../../Common/Preloader/Preloader";
import { ProfileType } from "../../../../types/types";
import { selectUserId } from "../../../../Redux/selectors/auth-selector";
import { ProfileData } from "./ProfileData/ProfileData";
import { ProfileDataForm } from "./ProfileDataForm/ProfileDataForm";


export const UserInfo: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const profile = useSelector(selectProfile) as ProfileType
    const AuthUserId = useSelector(selectUserId)
    const history = useHistory()
    const { userId } = useParams<UserIdParamTypes>()

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
        return <Preloader data-testid="userInfo_preloader" styles={'profilePre'} />
    }

    return (
        <div data-testid="aboutUser_wrapper" className={s.aboutUser}>
            <UserPhoto data-testid="user_photo_component" isOwner={!userId} img={profile.photos?.large} />
            <div>
            {!editMode && <ProfileData data-testid="profile_data_component" activateEditMode={activateEditMode}/>}
          
            </div>
            {editMode &&  <ProfileDataForm 
                profile={profile} 
                data-testid="profile_data_form_component" 
                deActivateEditMode={deActivateEditMode} 
                editMode={editMode}/>}
        </div>
    )
})

