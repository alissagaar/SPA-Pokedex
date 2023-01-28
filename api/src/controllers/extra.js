const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { Sequelize } = require('sequelize');


const getPokesFromApi = async () => {
    let pokesApi = [];

    await axios.get(`https://pokeapi.co/api/v2/pokemon`)
    .then(async (response) => {
        const firstResults = response.data.results;
        const secondResults = await axios.get(`${response.data.next}`)
        const joinResults = [...firstResults, ...secondResults.data.results]

        const pokePromises = [];
        joinResults.map(r => pokePromises.push(axios.get(r.url))); 
          
        await Promise.all(pokePromises)
        .then(pokes => {
            pokesApi = pokes.map(p => {
                return {
                    id: p.data.id,
                    name: p.data.name,
                    hp: p.data.stats[0].base_stat,
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    types: p.data.types.map(t => { return { name: t.type.name } }),
                    image: p.data.sprites.other.dream_world.front_default
                }; 
            }); 
        }) 
        .catch((error) => {
              return error;
        });

    })
    .catch((error) => {
        return error;
    });

    return pokesApi;
};


const getPokesFromDb = async () => {
    try {
        const pokesDbPromise = await Pokemons.findAll({
            include:{
                attributes: ["name"],
                model: Types,
                through: {
                    attributes: [],
                },
            }
        });

        return pokesDbPromise;
    } catch(error) {
        return error;
    }
};


const getAllPokes = async () => {
    try {
      const pokesApi = await getPokesFromApi();
      const pokesDb = await getPokesFromDb(); 
      return [...pokesApi,...pokesDb];
    } catch (error) {
      return error;
    }
};


// Poke info from Name
const getPokeApiByName = async (name) => {
    try {
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

        if (pokeApi) {
            return {
                id: pokeApi.data.id,
                name: pokeApi.data.name, 
                hp: pokeApi.data.stats[0].base_stat,
                attack: pokeApi.data.stats[1].base_stat,
                defense: pokeApi.data.stats[2].base_stat,
                speed: pokeApi.data.stats[5].base_stat,
                height: pokeApi.data.height,
                weight: pokeApi.data.weight,
                types: pokeApi.data.types.map(t => { return { name: t.type.name } }),
                image: pokeApi.data.sprites.other.dream_world.front_default,
            }; 
        } else {
            return null;
        }
    } catch(error) {
        return ({not : `Pokemon not found`});
        
    }
}

const getPokeDbByName = async(name) => { 
    try {
        const pokeDb = await Pokemons.findOne({
            where:  (
                Sequelize.fn('lower', Sequelize.col('pokemons.name')), 
                // .fn Search Query - Converts Pokemon name to lower case
                // .col to not confuse columns into strings
                Sequelize.fn('lower', name)
            ),

            include:{
                attributes: ["name"],
                model: Types,
                through: {
                    attributes: [],
                },
            }
        });
        return pokeDb;
    } catch(error) {
        return error;
    }
}

// Poke info from Id
const getPokeApiById = async (id) => {
    try {
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (pokeApi) {
            return {
                id: pokeApi.data.id,
                name: pokeApi.data.name,
                hp: pokeApi.data.stats[0].base_stat,
                attack: pokeApi.data.stats[1].base_stat,
                defense: pokeApi.data.stats[2].base_stat,
                speed: pokeApi.data.stats[5].base_stat,
                height: pokeApi.data.height,
                weight: pokeApi.data.weight,
                types: pokeApi.data.types.map((t) => { return { name: t.type.name }}),
                image: pokeApi.data.sprites.other.dream_world.front_default,
            }; 
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
}


const getPokeDbById = async (idSearch) => {
    try{
        const pokeDb = await Pokemons.findOne({
            where: { id: idSearch },
            include:{
                attributes: ["name"],
                model: Types,
                through: {
                    attributes: [],
                },
            }
        });
        return pokeDb;
    } catch(error){
        return null;
    }
}



module.exports ={
        getAllPokes,
        getPokeApiByName,
        getPokeDbByName,
        getPokeApiById,
        getPokeDbById,
};