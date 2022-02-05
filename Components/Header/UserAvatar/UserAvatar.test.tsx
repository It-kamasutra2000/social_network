import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { UserAvatar } from './UserAvatar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../Redux/store';
import { AuthApi } from '../../../Api/Auth-api';
import { ResultCodeEnum } from '../../../Api/Api';

jest.mock('../../../Api/Auth-api');

const AuthApiMock = AuthApi as jest.Mocked<typeof AuthApi>

const loginResult = {
    data: { userId: 14105 },
    fieldsErrors: [],
    messages: [],
    resultCode: ResultCodeEnum.success,
}

const authMeResult = {
    data: {
        email: "davogasparyan2000@mail.ru",
        id: 14105,
        login: "David_samurai",
    },
    fieldsErrors: [],
    messages: [],
    resultCode: ResultCodeEnum.success
}

AuthApiMock.login.mockReturnValue(loginResult as any);
AuthApiMock.authMe.mockReturnValue(authMeResult as any)

describe('Pages component test', () => {

    const UserAvatarContainer: FC = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <UserAvatar />
                </Provider>
            </BrowserRouter>
        )
    }

    it('UserAvatar content should be displayed', () => {
        render(<UserAvatarContainer />);
        const avatarWrapper = screen.getByTestId('avatar_wrapper');
        const userAvatarLink2 = screen.getByRole('user_avatar_link2');
        const loginButtonWrapper = screen.queryByTestId('login_button_wrapper');
        const loginButton = screen.queryByTestId('login_button');
        expect(avatarWrapper).toBeInTheDocument();
        expect(userAvatarLink2).toBeInTheDocument();
        expect(loginButtonWrapper).toBeInTheDocument();
        expect(loginButton).not.toBeNull();
    });

    it('this elements should not be displayed', () => {
        render(<UserAvatarContainer />);
        const userAvatarLink1 = screen.queryByRole('user_avatar_link1');
        const dropdownButton = screen.queryByTestId('dropdown_button');
        expect(userAvatarLink1).toBeNull();
        expect(dropdownButton).toBeNull();
    });
});