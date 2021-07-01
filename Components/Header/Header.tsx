import { BiNetworkChart } from 'react-icons/bi';
import React from 'react';
import s from "./Header.module.scss";
import { Pages } from './Pages/Pages';
import { UserAvatar } from './UserAvatar/UserAvatar';



export const Header: React.FC = React.memo(() => {

  return (
    <div className={s.header}>
      <div className={s.headerContent}>
        <div className={s.headerContentLeft}>
          <div className={s.logo}>
            <BiNetworkChart />
            <span>SOCIAL NETWORK</span>
          </div>
        </div>
        <div className={s.headerContentRight}>
          <div>
            <Pages />
          </div>
          <div>
            <UserAvatar />
          </div>
        </div>
      </div>
    </div>
  )
})
