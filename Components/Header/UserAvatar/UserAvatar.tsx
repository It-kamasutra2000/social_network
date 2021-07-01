import { Button, Dropdown, Menu, message } from 'antd';
import React from 'react';
import s from "./UserAvatar.module.scss";
import {
    UserOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUserProfile, selectIsAuth } from '../../../Redux/selectors/auth-selector';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../Redux/auth-Reducer';


export const UserAvatar: React.FC = React.memo(() => {

    const profile = useSelector(selectAuthUserProfile)
    const userName = profile?.fullName
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    function handleMenuClick(e: any) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Button danger block onClick={()=> {
                    dispatch(logout())
                }}>
                    logout
                </Button>
          </Menu.Item>
            <Menu.Item key="2" onClick={handleMenuClick} icon={<UserOutlined />}>
                2nd menu item
          </Menu.Item>
        </Menu>
    );

    return (
        <div className={s.avatar}>
            {isAuth ? <Dropdown.Button overlay={menu}>
                <NavLink to={'/profile'}>
                    <div> {userName}</div>
                </NavLink>
            </Dropdown.Button> 
            : <div>
                <Button>
                    <NavLink to={'./login'}>
                        login
                    </NavLink>
                </Button>
            </div>}
        </div>
    )
})
