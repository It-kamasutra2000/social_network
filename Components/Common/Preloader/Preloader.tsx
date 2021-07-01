import { Image } from "antd";
import React from "react";
import preloaderImg from '../../../images/loading.gif';
import s from './Preloader.module.scss';

type PropsType = {
    styles: string
}

export const Preloader: React.FC<PropsType> = React.memo(({styles})=> {
    return (
        <div className={s.preloader + ' ' + s[styles]}>
            <Image src={preloaderImg}/>
        </div>
    )
})
