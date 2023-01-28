import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './Landing.module.css';

export default function Landing() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/home');
    }

    return (
        <div className={s.heroLanding}>
            <button className={s.button} onClick={handleClick}>START</button>
        </div>
    )
}
