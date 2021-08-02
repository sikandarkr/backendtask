const express = require("express");
const fs = require('fs')
const router = express.Router();
router.get("/data", (req, res) => {
    res.json({ "data": "this was just for testing...." })
});

router.post('/save/:id', async function (req, res) {
    if (!fs.existsSync(`${__dirname}/data`)) {
        fs.mkdirSync(`${__dirname}/data`);
    }
    await fs.writeFile(`${__dirname}/data/${req.params.id}.json`, JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    let data = await fs.readFileSync(`${__dirname}/data/${req.params.id}.json`);
    res.status(200).json(JSON.parse(data));
});

router.get('/save/:id', (req, res, next) => {
    return res.json({ "example": "example....." });
});
module.exports = router;
