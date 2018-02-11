const router = require('express').Router();


router.use('/', require('./record/routes'));

module.exports = router;