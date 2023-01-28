import React from 'react'
import { useHistory } from 'react-router-dom';
import s from './ErrorPage.module.css';

function ErrorPage({ pokError }) {
    const history = useHistory();

    const handleClick = () => {
        history.push('/home');
    }

    return (
        <div className={s.eBox}>
            <h3>Uh-oh!</h3>
            <div className={s.image}></div>
            <p>Pokemon {pokError} Not Found</p>
            <button onClick={handleClick}>Go Back</button>
        </div>
    )
}

export default ErrorPage