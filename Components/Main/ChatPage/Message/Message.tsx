import React from 'react'
import { MessageType } from '../../../../Api/Chat-api';
import userPhoto from '../../../../images/img.jpg'
import s from './Message.module.scss';
import { Dropdown, Button } from 'antd';
import { useShowMore } from '../../../../hooks/useShowMore';


interface IPropsType {
    message: MessageType
}

export const Message: React.FC<IPropsType> = React.memo(({ message }) => {

    let { 
        fullText: fullMessageText, setShowFullText: setShowFullMessageText, menu, showFullText: showFullMessageText,
        isTextBig: isMessageTextBig, shortText: shortMessageText 
    } = useShowMore(message.message, 20, 'Message')
    

    const showMore = <span className={s.showMore}>{isMessageTextBig
        ? <Dropdown overlay={menu} placement="topCenter">
            <Button size={'small'} onClick={() => {
                setShowFullMessageText(true)
            }}>
                more
            </Button>
        </Dropdown>
        : null}</span>

    const hide = <Button className={s.close} size={'small'} onClick={() => {
        setShowFullMessageText(false)
    }}>
        hide
    </Button>

    const toggleButton = showFullMessageText ? hide : showMore
    let messageText = message.message 

    if(isMessageTextBig) {
        messageText = shortMessageText + '...'
    } else {
        messageText = fullMessageText
    }

    return (
        <div className={s.message}>
            <div className={s.userInfo}>
                <div>
                    <img src={message.photo || userPhoto} alt="uerPhoto" />
                </div>
                <div className={s.nameAndMess}>
                    <div data-test={'userNameTest'} className={s.userName}>
                        {message.userName}
                    </div>
                    <div className={s.message}>
                        <div>
                            message:
                        </div>
                        <span>
                            {showFullMessageText ? fullMessageText : messageText}
                        </span>
                    </div>
                    <div>{isMessageTextBig ? toggleButton : null} </div>
                </div>
            </div>
            <div className={s.bottomLine}>

            </div>
        </div>
    )
})
