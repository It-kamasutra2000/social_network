import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../../../../Redux/Profile-Reducer";
import { selectIsFetching, selectStatus } from "../../../../../../Redux/selectors/profile-selector";
import { Preloader } from "../../../../../Common/Preloader/Preloader";
import s from './Status.module.scss';
import { StatusForm } from "./StatusForm/StatusForm";
import { Dropdown } from 'antd';
import { useShowMore } from "../../../../../../hooks/useShowMore";

interface IPropsType {
    isOwner: boolean
}

export const Status: React.FC<IPropsType> = React.memo(({ isOwner }) => {

    const isFetching = useSelector(selectIsFetching);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);

    let {
        fullText: fullStatusText, menu, showFullText: showFullStatusText,
        isTextBig: isStatusTextBig, setShowFullText: setShowFullStatusText, shortText: shortStatusText
     } = useShowMore(status, 20, 'Status')

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = (statusText: string) => {
        setEditMode(false)
        dispatch(updateStatus(statusText))
    }


    const showMore = isStatusTextBig ?
        <Dropdown overlay={menu} placement="topCenter">
            <div className={s.showMore} onClick={() => {
                setShowFullStatusText(true)
            }}>
                ...
            </div>
        </Dropdown>
        : null

    let statusText = status
    if(isStatusTextBig) {
        statusText = shortStatusText
    }else if(!statusText) {
        statusText = 'no status'
    }  else {
        statusText = fullStatusText
    }

    fullStatusText = fullStatusText ? fullStatusText : 'no status'

    return (
        <div className={s.status}>
            {!editMode && <div className={s.test} onDoubleClick={() => {
                if (!isOwner) {
                    activateEditMode()
                }
            }}>
                <div>status: </div>
                <div className={s.statusText}>{showFullStatusText ? fullStatusText : statusText}</div>
                <div >{showFullStatusText || showMore } </div>
            </div>}
            {editMode && <div data-test={'editMode'}>
                <StatusForm deActivateEditMode={deActivateEditMode} />
            </div>}
            {isFetching && <div><Preloader styles={'statusPre'} /></div>}
        </div>
    )
})
