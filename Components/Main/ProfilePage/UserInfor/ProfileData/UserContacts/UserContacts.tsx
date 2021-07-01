import React from "react";
import { useSelector } from "react-redux";
import { selectIcons } from "../../../../../../Redux/selectors/profile-selector";
import { ContactsType, ProfileType } from "../../../../../../types/types";
import { UserContact } from "./UserContact/UserContact";
import s from "./UserContacts.module.scss";


type PropsType = {
   profile: ProfileType
}

export const UserContacts: React.FC<PropsType> = React.memo(({profile}) => {

    const icons = useSelector(selectIcons) 

    const contactsElements = Object.keys(profile?.contacts).map((key) =>  {
        return <UserContact key={key} contactsTitle={key} Icon={icons[key]} contactsValue={profile?.contacts[key as keyof ContactsType]} />
    })

  let arr: number[] = []
  let contactsTitle = Object.values(profile?.contacts)

  for(let i = 0; i < contactsTitle.length; i++) {
    if(contactsTitle[i]){
       arr.push(i)
    }
  }

    return (
        <div className={s.contacts}>
            <div className={s.contactsTitle}>
                contacts
            </div>
            <div className={s.contactsValues}>
               {arr.length ? contactsElements : <div className={s.noContacts}>no contacts</div>}
              </div>
        </div>
    )
})