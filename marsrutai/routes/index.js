const fs = require('fs');
const express = require('express');
const router = express.Router();

const language = {
    LT: 'lt',
    EN: 'en'
}

router.get('/', (req, res) => {
    res.render('index', {language: language.LT});
});

router.get('/en', (req, res) => {
    res.render('index', {language: language.EN});
});
  
router.get('/map', (req, res) => {
    fs.readFile('./data/points.json',
        { encoding: 'utf8', flag: 'r' },
        function (err, data) {
            if (err) {
                console.log(err);
                res.render('map', {language: language.LT, points: []});
            } else {
                res.render('map', {language: language.LT, points: JSON.parse(data)});
            }
        });
});

router.get('/map/en', (req, res) => {
    fs.readFile('./data/points.json',
        { encoding: 'utf8', flag: 'r' },
        function (err, data) {
            if (err) {
                console.log(err);
                res.render('map', {language: language.EN, points: []});
            } else {
                res.render('map', {language: language.EN, points: JSON.parse(data)});
            }
        });
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