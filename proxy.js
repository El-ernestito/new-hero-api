const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.get('/api/search/:name', async (req, res) => {
    const name = req.params.name;
    const url = `https://superheroapi.com/api/93e841b5b5ddca49b63afc5121ddbdc1/search/${encodeURIComponent(name)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from superheroapi' });
    }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));