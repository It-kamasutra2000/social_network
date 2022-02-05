import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { Pages } from './Pages';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../Redux/store';

describe('Pages component test', () => {

    const PagesContainer: FC = () => {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Pages />
                </Provider>
            </BrowserRouter>
        )
    }

    it('pages content should be displayed', () => {
        render(<PagesContainer />);
        const pagesWrapper = screen.getByTestId('pages_wrapper');
        const pageComponentWrappers = screen.getAllByTestId('page_component_wrapper');
        expect(pagesWrapper).toBeInTheDocument();
        expect(pageComponentWrappers).toHaveLength(2);
    });

    it('after unmount pages content should not be displayed', () => {
        const {unmount} = render(<PagesContainer />);
        const pagesWrapper = screen.queryByTestId('pages_wrapper');
        unmount();
        expect(pagesWrapper).not.toBeInTheDocument();
        expect(screen.queryAllByTestId('page_component_wrapper').length).toBeFalsy();
    });
});