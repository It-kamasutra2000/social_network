import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../Redux/store';

describe('ProfilePage component test', () => {

    const ProfilePageContainer: FC = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <ProfilePage />
                </Provider>
            </BrowserRouter>
        )
    }

    it('ProfilePage content should be displayed', () => {
        const { container } = render(<ProfilePageContainer />);
        const mainImg = screen.getByAltText('mainImg');
        const UserInfoWrapper = screen.getByTestId('UserInfo_wrapper');
        expect(container.firstChild).toBeInTheDocument();
        expect(mainImg).toBeInTheDocument();
        expect(UserInfoWrapper).toBeInTheDocument();
    });

    it('after unmount ProfilePage content should not be displayed', () => {
        const { container, unmount } = render(<ProfilePageContainer />);
        unmount();
        const mainImg = screen.queryByAltText('mainImg');
        const UserInfoWrapper = screen.queryByTestId('UserInfo_wrapper');
        expect(container.firstChild).not.toBeInTheDocument();
        expect(mainImg).not.toBeInTheDocument();
        expect(UserInfoWrapper).not.toBeInTheDocument();
    });
});