import React from 'react';
import s from "./NotFound.module.scss";


export const NotFound: React.FC = React.memo(() => {

    return (
        <div className={s.notFound}>
            NOT FOUND
        </div>
    )
})