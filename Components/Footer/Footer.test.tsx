import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component test', () => {
    it('footer content should be displayed', () => {
        render(<Footer />);
        const footer = screen.getByTestId(/footer/i);
        expect(footer).toBeInTheDocument();
    });

    it('footer div should contains correct text', () => {
        render(<Footer />);
        const footer = screen.getByText(/this site was created by David Gasparian/i);
        expect(footer.textContent).toBe('this site was created by David Gasparian');
    });

    it('if component is unmount then this footer dive should not be displayed', () => {
        const { unmount } = render(<Footer />);
        const footer = screen.getByTestId(/footer/i);
        expect(footer).toBeInTheDocument();
        unmount()
        expect(screen.queryByTestId(/footer/i)).not.toBeInTheDocument();
    });
})