import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../../../../Redux/Profile-Reducer";
import { selectIsFetching, selectStatus } from "../../../../../../Redux/selectors/profile-selector";
import { Preloader } from "../../../../../Common/Preloader/Preloader";
import s from './Status.module.scss';
import { StatusForm } from "./StatusForm/StatusForm";
import { Dropdown, Menu } from 'antd';
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
        fullText: fullStatusText,
        menu: showMoreMenu,
        showFullText: showFullStatusText,
        isTextBig: isStatusTextBig,
        setShowFullText: setShowFullStatusText,
        shortText: shortStatusText
    } = useShowMore(status, 20, 'Status')

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = (statusText: string) => {
        setEditMode(false)
        dispatch(updateStatus(statusText))
    }


    const showMore = isStatusTextBig ?
        <Dropdown overlay={showMoreMenu} placement="topCenter">
            <div className={s.showMore} onClick={() => {
                setShowFullStatusText(true)
            }}>
                ...
            </div>
        </Dropdown>
        : null

    let statusText = status
    if (isStatusTextBig) {
        statusText = shortStatusText
    } else if (!statusText) {
        statusText = 'no status'
    } else {
        statusText = fullStatusText
    }

    fullStatusText = fullStatusText ? fullStatusText : 'no status'



    const showInfoMenu = (
        <Menu className={s.menu}>
            <Menu.Item className={s.showInfoMenu}>
                <div>
                    doubleClick
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {!editMode && <div className={`${s.status} ${isOwner ? s.cursor : ''}`} onDoubleClick={() => {
                if (isOwner) {
                    activateEditMode()
                }
            }}>
                {isOwner
                    ? <Dropdown overlay={showInfoMenu} placement="topCenter">
                        <div className={s.statusTitle}>
                            status:
                        </div>
                    </Dropdown>
                    : <div className={s.statusTitle}>
                        status:
                    </div>}
                <div className={s.statusText}>
                    {showFullStatusText ? fullStatusText : statusText}
                </div>
                <div >
                    {showFullStatusText || showMore}
                </div>
            </div>}
            {editMode && <div>
                <StatusForm deActivateEditMode={deActivateEditMode} />
            </div>}
            {isFetching && <div><Preloader styles={'statusPre'} /></div>}
        </>
    )
})
