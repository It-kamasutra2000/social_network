
import React, { useEffect } from 'react';
import s from "./SideBar.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { SidebarUserPhoto } from './SidebarUserPhoto/SidebarUserPhoto';
import { getAuthUser } from '../../../Redux/auth-Reducer';
import { selectAuthUserProfile } from '../../../Redux/selectors/auth-selector';
import { NavLink } from 'react-router-dom';
import { Friends } from './Friends/Friends'
import { getFriends } from '../../../Redux/Sidebar-Reducer';


export const SideBar = () => {

  const dispatch = useDispatch()
  const profile = useSelector(selectAuthUserProfile)

  useEffect(() => {
    dispatch(getAuthUser())
    dispatch(getFriends())
  }, [dispatch])
  

  return (
    <div className={s.sidebar}>
      <div className={s.sidebarTop}>
      </div>
      <div className={s.sidebarBottom}>
        <div className={s.userPhoto}>
          <NavLink to={'/profile'}>
            <SidebarUserPhoto img={profile?.photos.large} />
          </NavLink>
        </div>
        <div className={s.userName}>
          <NavLink to={'/profile'}>
            <span>{profile?.fullName}</span>
          </NavLink>
        </div>
        <div>
          <Friends/>
        </div>
        <div className={s.viewP}>
        <NavLink to={'/profile'}>
            view profile
        </NavLink>
        </div>
      </div>
      </div>
  )
}