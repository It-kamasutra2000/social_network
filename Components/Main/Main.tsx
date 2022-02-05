import React, { FC, Suspense } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./Main.module.scss";
import '../../App.css';
import { UsersPage } from "./UserPage/UserPage";
import { ProfilePage } from "./ProfilePage/ProfilePage"
import { SideBar } from "./SideBar/SideBar"
import { selectIsAuth } from '../../Redux/selectors/auth-selector'
import { LoginPage } from "./LoginPage/LoginPage";
import { NotFound } from './../NotFound/NotFound'


const ChatPage: FC = React.lazy(() => import('./ChatPage/ChatPage'));


export const Main = React.memo(() => {

  const isAuth = useSelector(selectIsAuth)

  return (
    <div className={s.main}>
      {isAuth && <SideBar />}
      <div className={`commonContentStyle ${!isAuth ? 'authorized' : ''}`}>
        <div>
          <Switch>
            <Route path={'/profile/:userId?'} render={() => {
              return <ProfilePage />
            }} />
            <Route path={'/users'}>
              <UsersPage />
            </Route>
            <Route path={'/login'}>
              <LoginPage />
            </Route>
            <Route exact path={'/'} render={() => {
              return <Redirect to={"/profile"}
              />
            }} />
            <Route path={'*'}>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
      <div>
         {isAuth && <Suspense fallback={<div>loading...</div>}>
        <ChatPage/>
        </Suspense>}
      </div> 
    </div>
  )
})