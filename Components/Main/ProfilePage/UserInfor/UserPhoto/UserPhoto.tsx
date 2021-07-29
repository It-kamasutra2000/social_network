import { Input } from "antd"
import React, { FormEvent } from "react"
import s from './UserPhoto.module.scss'
import userPhoto from '../../../../../images/img.jpg'
import { useDispatch, useSelector } from "react-redux"
import { updateUserPhoto } from '../../../../../Redux/Profile-Reducer';
import { selectIsLoading } from "../../../../../Redux/selectors/profile-selector"
import { Preloader } from "../../../../Common/Preloader/Preloader"
import { AiOutlineSelect } from 'react-icons/ai';


type PropsType = {
    img: string | null
    isOwner: boolean
}

export const UserPhoto: React.FC<PropsType> = React.memo(({ img, isOwner }) => {

    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    const onHandleSelect = (e: FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.length && e.currentTarget.files[0]
        dispatch(updateUserPhoto(file as File))
    }

    return (
        <div className={s.userPhoto}>
            <div>
                <img src={img ? img : userPhoto} alt={'userPhoto'} />
            </div>
            {isOwner && <div className={s.selectPhoto}>
                <label className={s.label} htmlFor="file">
                    <AiOutlineSelect />
                </label>
            </div>}

            <Input hidden={true} type={'file'} id={'file'} onChange={onHandleSelect} />
            {isLoading && <Preloader styles={'photosPre'} />}
        </div>
    )
})