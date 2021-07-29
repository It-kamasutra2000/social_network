import React, { useEffect, useState } from "react";
import s from './ChatPage.module.scss';
import { ChatForm } from "./ChatForm/ChatForm";
import { Message } from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { startMessageEventListening, stopMessageEventListening } from "../../../Redux/Chat-Reducer";
import { selectIsChatMessages } from "../../../Redux/selectors/chat-selector";
import ReactScrollableFeed from 'react-scrollable-feed'
import { selectIsAuth } from "../../../Redux/selectors/auth-selector";
import { Redirect } from "react-router-dom";
import { BsChatDots } from 'react-icons/bs';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';


const ChatPage: React.FC = React.memo(() => {

    const isAuth = useSelector(selectIsAuth)
    const [isChatOpen, setIsChatOpen] = useState(true)

    if (!isAuth) {
        return <Redirect to={{
            pathname: "/login"
        }} />
    }
    return (
        <div className={`${s.chatPage} ${isChatOpen ? '' : s.hide}`}>
            <div className={s.chatTop}>
                <div>
                    <span> Chat </span>
                    <BsChatDots />
                </div>
                <div className={s.icon} onClick={() => {
                    setIsChatOpen(!isChatOpen)
                }}>
                    {isChatOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>
            </div>
            <Chat />
            <ChatForm />
        </div>
    )
})


export const Chat: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const messages = useSelector(selectIsChatMessages)

    useEffect(() => {
        dispatch(startMessageEventListening())
        return () => {
            dispatch(stopMessageEventListening())
        }
    }, [dispatch])


    const chatMessages = messages.map((m) => <Message key={m.id} id={m.userId} message={m} />)

    return (
        <div className={s.chat} >
            <ReactScrollableFeed >
                {chatMessages}
            </ReactScrollableFeed>
        </div>
    )
})



export default ChatPage;
