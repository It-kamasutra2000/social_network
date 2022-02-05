import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Redux/store';

describe('Header component test', () => {

    const HeaderContainer: FC = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </BrowserRouter>
        )
    }

    it('header content should be displayed', () => {
        render(<HeaderContainer />);
        const headerWrapper = screen.getByTestId('header_wrapper');
        const headerContent = screen.getByTestId('header_content');
        const headerContentLeft = screen.getByTestId('header_content_left');
        const headerContentRight = screen.getByTestId('header_content_right');
        expect(headerWrapper).toBeInTheDocument();
        expect(headerContent).toBeInTheDocument();
        expect(headerContentLeft).toBeInTheDocument();
        expect(headerContentRight).toBeInTheDocument();
    });

    it('after unmount header content should not be displayed', () => {
        const { unmount } = render(<HeaderContainer />);
        const headerWrapper = screen.getByTestId('header_wrapper');
        const headerContent = screen.getByTestId('header_content');
        const headerContentLeft = screen.getByTestId('header_content_left');
        const headerContentRight = screen.getByTestId('header_content_right');
        unmount()
        expect(headerWrapper).not.toBeInTheDocument();
        expect(headerContent).not.toBeInTheDocument();
        expect(headerContentLeft).not.toBeInTheDocument();
        expect(headerContentRight).not.toBeInTheDocument();
    });
});