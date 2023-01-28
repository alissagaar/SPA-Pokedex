import React from 'react';
import { Link } from "react-router-dom";
import s from './PokeCard.module.css';

export default function PokeCard({id, name, attack, types, image}) {
    
    return (
        <div className={s.pokecard}>
            <div className={s.pokeimg}>
                <img src={image} alt={name} />
            </div>
            <div className={s.pokeinfo} >
                <Link to={`/pokeId/${id}`} ><h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3></Link> 
                {types && types.map(t => <span>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</span> )}
            </div>
        </div>
    )
}

