import React from "react";
import PokeCard from "../PokeCard/PokeCard";
import s from './Pokemons.module.css'


export default function Pokemons ({pokemons}) {
    return(
        <div className={s.container} >
            {pokemons.map(pokemon => (
                !pokemon ? 
                <div className={s.noMatch}>
                    <h3>Oops!</h3>
                    <div className={s.noMatchImage}></div>
                    <p>Snorlax can't seem to find matches</p>
                </div> :
                <PokeCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    attack={pokemon.attack}
                    types={pokemon.types}
                    image={pokemon.image}
                />
            ))}
        </div>
    )
};

