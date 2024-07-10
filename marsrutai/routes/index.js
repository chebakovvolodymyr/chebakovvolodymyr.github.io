const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {language: 'lt'});
});

router.get('/en', (req, res) => {
    res.render('index', {language: 'en'});
});
  
router.get('/map', (req, res) => {
    res.render('map');
});

module.exports = router;