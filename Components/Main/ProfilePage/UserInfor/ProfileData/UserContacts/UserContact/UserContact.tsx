import React from "react";
import s from "./UserContact.module.scss";
import { IconType } from "react-icons/lib";

type PropsType = {
    contactsTitle: string
    contactsValue: string
    Icon: IconType
}

export const UserContact: React.FC<PropsType> = React.memo(({ contactsTitle, contactsValue, Icon }) => {
    return (
        <div>
            {contactsValue ?
            <div className={s.contact}>
                <span>{contactsTitle}:</span> 
                <a href={contactsValue}> <Icon className={s.icon}/></a>
            </div> : null}
        </div>
    )
});

