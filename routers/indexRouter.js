const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();

router.get('/', indexController.getPage);
router.get('/new', indexController.getNew);
router.post('/new', indexController.postNew);
router.get('/message/:id', indexController.getMessage);

module.exports = router;