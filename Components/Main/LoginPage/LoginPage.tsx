import React from "react";
import s from './LoginPage.module.scss';
import {LoginForm} from './LoginForm/LoginForm';
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../Redux/selectors/auth-selector";
import { Redirect } from "react-router-dom";

export const LoginPage: React.FC = React.memo(() => {

  const isAuth = useSelector(selectIsAuth)

  if(isAuth){
      return <Redirect to={'/profile'}/>
  }

  return (
    <div className= {s.loginPage}>
      <div className={s.loginHeader}>
        login
      </div>
      <div>
        <LoginForm/>
      </div>
    </div>
  );
})
