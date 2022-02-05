import React from "react";
import s from './Footer.module.scss';

export const Footer: React.FC = React.memo(() => {
    return (
        <div data-testid="footer" className={s.footer}>
            this site was created by David Gasparian
        </div>
    )
})