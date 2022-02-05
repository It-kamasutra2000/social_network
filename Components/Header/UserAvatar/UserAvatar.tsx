import { Button, Dropdown, Menu, message } from 'antd';
import React from 'react';
import {
    UserOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthUserProfile, selectIsAuth } from '../../../Redux/selectors/auth-selector';
import { logout } from '../../../Redux/auth-Reducer';
import s from "./UserAvatar.module.scss";


export const UserAvatar: React.FC = React.memo(() => {

    const authorizedUserData = useSelector(selectAuthUserProfile)
    const userName = authorizedUserData?.fullName
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    function handleMenuClick() {
        message.info('Click on menu item.');
    }

    const menu = (
        <Menu role={'menu'}>
            <Menu.Item role={'menu-item1'} key="1">
                <Button danger block onClick={()=> {
                    dispatch(logout())
                }}>
                    logout
                </Button>
          </Menu.Item>
            <Menu.Item role={'menu-item2'} key="2" onClick={handleMenuClick} icon={<UserOutlined />}>
                2nd menu item
          </Menu.Item>
        </Menu>
    );

    return (
        <div data-testid="avatar_wrapper" className={s.avatar}>
            {isAuth ? <Dropdown.Button data-testid="dropdown_button" overlay={menu}>
                <NavLink role={'user_avatar_link1'} to={'/profile'}>
                    <div> {userName}</div>
                </NavLink>
            </Dropdown.Button> 
            : <div data-testid="login_button_wrapper">
                <Button data-testid="login_button">
                    <NavLink role={'user_avatar_link2'} to={'./login'}>
                        login
                    </NavLink>
                </Button>
            </div>}
        </div>
    )
})
