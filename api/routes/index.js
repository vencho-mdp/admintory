const { Router } = require('express');
const auth = require('./auth');
const supplier = require('./suppliers');

const router = Router();

router.use('/auth', auth);
router.use('/suppliers', supplier);

module.exports = router;
