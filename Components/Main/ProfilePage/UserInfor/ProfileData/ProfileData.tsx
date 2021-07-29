import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { selectProfile } from "../../../../../Redux/selectors/profile-selector"
import { ProfileType } from "../../../../../types/types"
import { ParamTypes } from "../UserInfo"
import s from './ProfileData.module.scss';
import { Status } from "./Status/Status"
import { UserContacts } from "./UserContacts/UserContacts"
import { AiOutlineEdit } from 'react-icons/ai';


type ProfileDataPropsType = {
    activateEditMode: () => void
}

export const ProfileData: React.FC<ProfileDataPropsType> = React.memo(({ activateEditMode }) => {

    const profile = useSelector(selectProfile) as ProfileType
    const { userId } = useParams<ParamTypes>()

    return (
        <div className={s.profileData}>
            <div className={s.userNameAndStatus}>
                <div className={s.userName}>
                    {profile?.fullName}
                    {!userId && <div className={s.editIcon} onClick={() => {
                        activateEditMode()
                    }}>
                        <AiOutlineEdit />
                    </div>}
                </div>
                <div>
                    <Status isOwner={!userId} />
                </div>
                <div className={s.aboutMe}>
                    <span>about me: </span>{profile?.aboutMe || '.....'}
                </div>
                <div className={s.lookingForAJob}>
                    <span>looking for a Job: </span>{profile?.lookingForAJob ? 'yes' : 'no'}
                </div>
                <div className={s.professionalSkills}>
                    {profile?.lookingForAJob
                        ? <div><span> my professional skills: </span>{profile?.lookingForAJobDescription || '.....'}</div>
                        : null}
                </div>
            </div>
            <div className={s.contacts}>
                <UserContacts profile={profile} />
            </div>
        </div>
    )
})