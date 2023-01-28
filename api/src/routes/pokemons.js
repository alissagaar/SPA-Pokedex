const { Router } = require('express');
const router = Router();
const { getPokemons, getPokemonById, postPokemon, deletePokemon } = require('../controllers/pokesControllers');

router.post('/', postPokemon);
router.get('/', getPokemons);
router.get('/:id', getPokemonById);
router.delete('/:id', deletePokemon);

module.exports = router;