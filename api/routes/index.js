const { Router } = require('express');
const auth = require('./auth');
const supplier = require('./suppliers');
const source_materials = require('./source_materials');

const router = Router();

router.use('/auth', auth);
router.use('/suppliers', supplier);
router.use('/source-materials', source_materials);

module.exports = router;
