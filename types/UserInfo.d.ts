type UserIdParamTypes = {
    userId: string
}

type UserPhotoType = {
    img: string | null
    isOwner: boolean
}

type ProfileDataPropsType = {
    activateEditMode: () => void
}

type UserContactsType = {
    profile: ProfileType
 }

 type ProfileDataFormPropsType = {
    deActivateEditMode: () => void
    editMode: boolean
    profile: ProfileType | any
}