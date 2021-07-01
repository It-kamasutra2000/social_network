import React, { useState } from 'react'
import { Menu } from 'antd';
import s from './useShowMore.module.scss'


export const useShowMore = (text: string, textSize: number, componentName: string) => {

    const [showFullText, setShowFullText] = useState<boolean>(false)


    const isShowMoreText = componentName !== 'Friend'

    const fullText: string = text
    let shortText = '';
    const textLength = text?.length
    const isTextBig = textLength && textLength > textSize

    if (isTextBig) {
        shortText = text.slice(0, textSize)
    }


    let menu = (
        <Menu className={s.menu}>
            <Menu.Item className={s.showMoreText} onClick={() => {
                isShowMoreText && setShowFullText(true)
            }}>
                <span>{isShowMoreText ? 'show more' : fullText}</span>
            </Menu.Item>
        </Menu>
    );


    return {
        fullText,
        isTextBig,
        showFullText,
        setShowFullText,
        menu,
        shortText
    }

}