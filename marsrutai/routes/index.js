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

router.get('/hike', (req, res) => {
    res.render('hike');
});

router.get('/bicycle', (req, res) => {
    res.render('bicycle');
});

router.get('/kayak', (req, res) => {
    res.render('kayak');
});

module.exports = router;