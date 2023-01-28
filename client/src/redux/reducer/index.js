const initialState = {
    pokes: [],
    filtered:[],
    pokeById: {},
    pokeByName: {},
    types: [],
}

export default function rootReducer(state= initialState, action){
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokes: action.payload,
                filtered: action.payload
            }
        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                pokeById: action.payload,
            }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                pokeByName: action.payload,
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload,
            }
        case 'CREATE_POKEMON':
            const newPoke = {
                id: action.payload.id,
                name: action.payload.name,
                types: action.payload.types.map(t => { return {name: t.name} }),
                hp: action.payload.hp,
                attack: action.payload.attack,
                defense: action.payload.defense,
                speed: action.payload.speed,
                height: action.payload.height,
                weight: action.payload.weight,
                image: action.payload.image
            }
            return {
                ...state,
                pokes: [...state.pokes, newPoke],
            }
        case 'FILTER_BY':
            const allPokemonsApi = [...state.filtered]

            // const filteredPokemons = action.payload.author === 'none' && action.payload.type !== 'none' && allPokemonsApi.filter(p => { return p.types.some(t => t.name === action.payload.type) })

            const filteredPokemons = 
                action.payload.author === 'none' && action.payload.type === 'none' ? 
                allPokemonsApi :
                action.payload.author === 'pokeapi' && action.payload.type === 'none' ? 
                allPokemonsApi.filter(p => !isNaN(p.id)) : 
                action.payload.author === 'own' && action.payload.type === 'none' ? 
                allPokemonsApi.filter(p => isNaN(p.id)) : 
                action.payload.author === 'none' && action.payload.type !== 'none' ?
                allPokemonsApi.filter(p => { return p.types.some(t => t.name === action.payload.type)}):
                action.payload.author === 'pokeapi' && action.payload.type !== 'none' ?
                allPokemonsApi
                .filter(p => !isNaN(p.id))
                .filter(p => {
                    return p.types.some(t => t.name === action.payload.type)
                })
                :
                allPokemonsApi
                .filter(p => isNaN(p.id))
                .filter(p => {
                    return p.types.some(t => t.name === action.payload.type)
                })
            return {
                ...state,
                pokes: filteredPokemons.length > 0 ? filteredPokemons : [null],
            }
        case "SORT_BY":
            const orderedPokemons = state.pokes.sort(function (
                a,
                b
            ) {
                if (action.payload === "asc") {
                    if (a.name < b.name) {
                      return -1;
                    } else if (a.name > b.name) {
                      return 1;
                    } else {
                      return 0;
                    }
                } else if (action.payload === "desc") {
                    if (a.name > b.name) {
                      return -1;
                    } else if (a.name < b.name) {
                      return 1;
                    } else {
                      return 0;
                    }
                } else if (action.payload === "ws") {
                    if (a.attack < b.attack) {
                      return -1;
                    } else if (a.attack > b.attack) {
                      return 1;
                    } else {
                      return 0;
                    }
                } else if (action.payload === "sw") {
                    if (a.attack > b.attack) {
                      return -1;
                    } else if (a.attack < b.attack) {
                      return 1;
                    } else {
                      return 0;
                    }
                }
                  return "Ordered";
                });
            return {
                ...state,
                pokes: orderedPokemons,
            };
        // case 'FILTER_BY_TYPES':
        //     return {
        //         ...state,
        //         filter: action.payload,
        //     }
        // case 'FILTER_BY_CREATOR':
        //     return {
        //         ...state,
        //         filter: action.payload,
        //     }
        // case 'FILTER_BY_ALPHORDER':
        //     return {
        //         ...state,
        //         filter: action.payload,
        //     }
        // case 'FILTER_BY_ATTACK':
        //     return {
        //         ...state,
        //         filter: action.payload,
        //     }
        default:
            return {...state}
    }
}