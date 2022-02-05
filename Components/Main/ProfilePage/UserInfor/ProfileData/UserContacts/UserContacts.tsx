import React from "react";
import { useSelector } from "react-redux";

import { selectIcons } from "../../../../../../Redux/selectors/profile-selector";
import { ContactsType } from "../../../../../../types/types";
import { UserContact } from "./UserContact/UserContact";
import s from "./UserContacts.module.scss";


export const UserContacts: React.FC<UserContactsType> = React.memo(({profile}) => {

    const contactIcons = useSelector(selectIcons) 

    const contactsElements = Object.keys(profile?.contacts).map((key) =>  {
        return <UserContact key={key} contactsTitle={key} Icon={contactIcons[key]} contactsValue={profile?.contacts[key as keyof ContactsType]} />
    })

  let contactsCount: number[] = []
  let contactsTitle = Object.values(profile.contacts)

  for(let i = 0; i < contactsTitle.length; i++) {
    if(contactsTitle[i] !== null){
        contactsCount.push(i)
    }
  }

    return (
        <div className={s.contacts}>
            <div className={s.contactsTitle}>
                contacts
            </div>
            <div className={s.contactsValues}>
               {contactsCount.length ? contactsElements : <div className={s.noContacts}>no contacts</div>}
              </div>
        </div>
    )
})