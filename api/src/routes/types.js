const { Router } = require('express');
const router = Router();
const { getTypes } = require('../controllers/typesControllers')


router.get('/', getTypes);


module.exports = router;