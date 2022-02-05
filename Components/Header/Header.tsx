import { BiNetworkChart } from 'react-icons/bi';
import React from 'react';

import s from "./Header.module.scss";
import { Pages } from './Pages/Pages';
import { UserAvatar } from './UserAvatar/UserAvatar';


export const Header: React.FC = React.memo(() => {

  return (
    <div data-testid="header_wrapper" className={s.header}>
      <div data-testid="header_content" className={s.headerContent}>
        <div data-testid="header_content_left" className={s.headerContentLeft}>
          <div className={s.logo}>
            <BiNetworkChart />
            <span>SOCIAL NETWORK</span>
          </div>
        </div>
        <div data-testid="header_content_right" className={s.headerContentRight}>
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
