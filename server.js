const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port =  4000;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const houses = JSON.parse(fs.readFileSync('houses.json', 'utf8'));

app.get('/api/houses', (req, res) => {
    const { city, min_rent, max_rent, rooms, family_size } = req.query;

    let filteredHouses = houses;

    if (city) {
        filteredHouses = filteredHouses.filter(house => house.city.toLowerCase() === city.toLowerCase());
    }

    if (min_rent && max_rent) {
        filteredHouses = filteredHouses.filter(house => house.rent >= parseInt(min_rent) && house.rent <= parseInt(max_rent));
    }

    if (rooms) {
        filteredHouses = filteredHouses.filter(house => house.rooms == rooms);
    }

    if (family_size) {
        filteredHouses = filteredHouses.filter(house => house.family_size == family_size);
    }

    res.json(filteredHouses);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
