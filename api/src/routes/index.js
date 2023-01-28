const { Router } = require('express');
const pokemonRoute = require('./pokemons')
const typeRoute = require('./types')

const router = Router();

router.use('/pokemons', pokemonRoute)
router.use('/types', typeRoute)


module.exports = router;
