import axios from 'axios';
import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_TYPES,
    CREATE_POKEMON,
    FILTER_BY,
    SORT_BY
} from './actionTypes';

// Async Actions
export const getAllPokemons = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/pokemons')
        .then(resp => dispatch({type: GET_ALL_POKEMONS, payload: resp.data}))
        .catch(error => console.log(error))

        // return fetch ('http://localhost:3001/pokemons')
        // .then(resp => resp.json())
        // .then(data => dispatch({type: GET_ALL_POKEMONS, payload: data}))
        // .catch(error => console.log(error))
    }
}

export const getPokemonById = (id) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then(resp => dispatch({type: GET_POKEMON_BY_ID, payload: resp.data}))
        .catch(error => console.log(error))

        // return fetch(`http://localhost:3001/pokemons/${id}`)
        // .then(resp => resp.json())
        // .then(data => dispatch({type: GET_POKEMON_BY_ID, payload: data}))
        // .catch(error => console.log(error))
    }
}

export const getPokemonByName = (name) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then(resp => dispatch({type: GET_POKEMON_BY_NAME, payload: resp.data}))
        .catch(error => console.log(error))

        // return fetch(`http://localhost:3001/pokemons?name=${name}`)
        // .then(resp => resp.json())
        // .then(data => dispatch({type: GET_POKEMON_BY_NAME, payload: data}))
        // .catch(error => console.log(error))
    }
}

export const getTypes = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/types')
        .then(resp => dispatch({type: GET_TYPES, payload: resp.data}))
        .catch(error => console.log(error))

        // return fetch('http://localhost:3001/types')
        // .then(resp => resp.json())
        // .then(data => dispatch({type: GET_TYPES, payload: data}))
        // .catch(error => console.log(error))
    }
}

export const createPokemon = (pokemon) => {
    return function (dispatch){
        axios.post('http://localhost:3001/pokemons',pokemon)
        .then(resp => dispatch({type: CREATE_POKEMON, payload: resp.data}))
        .catch(error => console.log(error))
    }
}

export const filterBy = (author, type) => {
    return { type: FILTER_BY, payload: { author, type } };
  };

export const sortBy = (orderType) => {
    return { type: SORT_BY, payload: orderType };
};

// export const filterByTypes = (arr, t) =>{
//     return function(dispatch){
//         const filtered = []
//         for (let i = 0; i < arr.length; i++) {
//             for (let j = 0; j < arr[i].types.length; j++) {
//                 if(arr[i].types[j].name === t){
//                     filtered.push(arr[i])
//                 }                                
//             }            
//         }
//         dispatch({type: FILTER_BY_TYPES, payload: filtered})
//     }
// }

// export const filterByCreator = (arr, creator) => {
//     return function (dispatch){
//         if(creator === 'pokeapi'){
//             const pokeFromApi = arr.filter(poke => !isNaN(poke.id))
//             dispatch({type: FILTER_BY_CREATOR, payload: [...pokeFromApi]})
//         }
//         if(creator === 'own'){
//             const pokeFromDb = arr.filter(poke => isNaN(poke.id))
//             dispatch({type: FILTER_BY_CREATOR, payload: [...pokeFromDb]})
//         }
//     }
// }

// export const filterByAlphOrder = (arr, order) => {
//     return function (dispatch){
//         if (order === 'az'){
//             const asc = arr.sort((pokeA,pokeB) => {
//                 if(pokeA.name < pokeB.name) return -1;
//                 if(pokeA.name > pokeB.name) return 1;
//                 else return 0;
//             })
//             dispatch({type:FILTER_BY_ALPHORDER, payload:[...asc]})
//         }
//         if (order === 'za'){
//             const desc = arr.sort((pokeA,pokeB) => {
//                 if(pokeA.name > pokeB.name) return -1;
//                 if(pokeA.name < pokeB.name) return 1;
//                 else return 0;
//             })
//             dispatch({type:FILTER_BY_ALPHORDER, payload:[...desc]})
//         }
//     }
// }

// export const filterByAttack = (arr, power) => {
//     return function (dispatch){
//         if (power === 'ws'){
//             const asc = arr.sort((pokeA,pokeB) => {
//                 if(pokeA.attack < pokeB.attack) return -1;
//                 if(pokeA.attack > pokeB.attack) return 1;
//                 else return 0;
//             })
//             dispatch({type:FILTER_BY_ATTACK, payload:[...asc]})
//         }
//         if (power === 'sw'){
//             const desc = arr.sort((pokeA,pokeB) => {
//                 if(pokeA.attack > pokeB.attack) return -1;
//                 if(pokeA.attack < pokeB.attack) return 1;
//                 else return 0;
//             })
//             dispatch({type:FILTER_BY_ATTACK, payload:[...desc]})
//         }
//     }
// }