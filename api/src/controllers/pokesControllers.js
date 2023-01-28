const axios = require('axios');
const { Pokemons, Types, PT } = require('../db');
const { getPokeApiByName, getPokeDbByName, getAllPokes, getPokeApiById, getPokeDbById} = require('./extra')

const getPokemons = async(req,res,next) => {
    try {       
        const { name } = req.query;
        if(name){
            let pokemon = await getPokeApiByName(name);
            if (pokemon.not){
                pokemon = await getPokeDbByName(name); 

                if (!pokemon){
                    return res.status(404).json({message:`No pokemon found for ${name}`});
                }
            }

            return res.status(201).json(pokemon);
        } else {
            const totalPokes = await getAllPokes(); 
            return res.status(200).json(totalPokes);
        }
    } catch (error) {
        next(error);
    }
}


const getPokemonById = async(req,res,next) => {
    try {
        const { id } = req.params;
        let poke;
        if (id.length > 4 || id.includes('-')){
            poke = await getPokeDbById(id);
            if(!poke) return res.status(404).json({message:`No pokemon matches ${id}`})
            return res.status(201).json(poke);
        } else {
            poke = await getPokeApiById(id);
            if(!poke) return res.status(404).json({message:`No pokemon matches ${id}`})
            return res.status(201).json(poke);
        }
    } catch (error) {
        next(error);
    }
}

const postPokemon = async(req,res,next) => {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
    
    if(!name || !image || !types) return res.status(404).json({message: 'Complete all the required fields'});
        
    try {
        const newPokemon = await Pokemons.create(req.body);

        if (newPokemon && Array.isArray(types)) {
            const pokeTypes = types.map(async t => {
                let type = await Types.findAll({
                    where: { name: t }
                });
                
                return newPokemon.setTypes(type);
            }); 

            await Promise.all(pokeTypes); 
        }

        let createdPoke = await Pokemons.findAll({
            where:{ name: name },
            include: [{
                model: Types,
                attributes: ['id', 'name']
            }]
        });

        return res.status(201).json(createdPoke[0]);
    }
    catch (error) {
        next(error);
    }
}


//Only used for Postman (with Db Pokes)
const deletePokemon = async(req,res,next) => {
    try {
        const { id } = req.params;
        let poke;
        if (id.length > 4 || id.includes('-')){
            poke = await getPokeDbById(id);
            if(!poke) return res.status(404).json({message:`No pokemon matches ${id}`})
            else{
                await poke.destroy()
                return res.status(201).send(`Successfull action: Pokemon has been eliminated from Db`);
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports= {
    getPokemons,
    getPokemonById,
    postPokemon,
    deletePokemon
}