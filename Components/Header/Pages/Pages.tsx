import React from "react"
import {
    HomeOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import { IconType } from "react-icons/lib";

import { Page } from "./Page/Page";
import s from './Pages.module.scss';


export const Pages: React.FC = React.memo(() => {
    return (
        <div data-testid="pages_wrapper" className={s.pages}>
            <div data-testid="page_component_wrapper">
                <Page key={'page1'} Icon={HomeOutlined as IconType} path={'profile'} pageName={'profile'}/>
            </div>
            <div data-testid="page_component_wrapper">
                <Page key={'page2'} Icon={UserSwitchOutlined as IconType} path={'users'} pageName={'users'}/>
            </div>
        </div>
    )
})
