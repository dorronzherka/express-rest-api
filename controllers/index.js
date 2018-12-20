const router = require('express').Router();

// Endpoint: /
router.use('/', require('./userController'));
module.exports = router;