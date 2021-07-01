import React from "react"
import s from './Pages.module.scss';
import {
    HomeOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import { Page } from "./Page/Page";
import { IconType } from "react-icons/lib";


export const Pages: React.FC = React.memo(() => {
    return (
        <div className={s.pages}>
            <div>
                <Page key={'page1'} Icon={HomeOutlined as IconType} path={'profile'} pageName={'profile'}/>
            </div>
            <div>
                <Page key={'page2'} Icon={UserSwitchOutlined as IconType} path={'users'} pageName={'users'}/>
            </div>
        </div>
    )
})
