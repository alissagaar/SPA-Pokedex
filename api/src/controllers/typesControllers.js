const axios = require('axios');
const { Types } = require('../db');

const getTypes = async (req,res,next)=>{
    try {
        const typesDb = await Types.findAll();
        if (!typesDb.length) {
            try{
                const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
                const types = typesApi.data.results.map(t => { return { name: t.name } });
                await Types.bulkCreate(types);
                res.status(200).json(Types);
            }
            catch(error){
                next(error);    
            }
        }
        else {
            return res.status(200).json(typesDb);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTypes
}