const express = require('express');
const router = express.Router();
const userss = require('../useres');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/show', async (req, res, next) => {
    try {
        const result = await require('../useres').show();
        console.log('///////result');
        console.log(result);
        res.send(result);
    } catch (e) {
        res.send(e);
    }
});

router.get('/select', async (req, res, next) => {
    console.log('select');
    try {
        const param = req.query;
        for (const x in param) {
            console.log(`${x} ${param[x]}`);
            const result = await require('../services/users').select(x, param[x]);
            res.send(result);
        }
    } catch (e) {
        res.send(e);
    }
});
router.get('/update', async (req, res, next) => {
    console.log('update');
    try {
        const param = req.query;
        const attributename = [], attribute = [];
        for (const x in param) {
            console.log(`${x} ${param[x]}`);
            attributename.push(x);
            attribute.push(param[x]);
        }
        const result = await require('../services/users').update(attributename[0], attribute[0], attributename[1], attribute[1]);
        res.send(result);
    } catch (e) {
        res.send(e);
    }
});

router.get('/insert', async (req, res, next) => {
    console.log('insert');
    try {
        const param = req.query;
        for (const x in param) {
            console.log(`${x} ${param[x]}`);
            const result = await require('../services/users').insert(x, param[x]);
            res.send(result);
        }
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;
