const express = require('express');
const app = express();
const path = require('path');

const weatherData = require('../utils/weatherData');
const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '..templates/partials');

app.use(express.static(publicStaticDirPath));

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
    //res.send("Weather chl ja re")
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: "Ache se address likh bhai",
        })
    }
    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        });
    });
    //res.render('/weather', 'Weather is Coming');
});

app.get('*', (req, res) => {
    //res.send('Weather is not here');
    res.render('404');
});

app.listen(port, () => {
    console.log('Chala re chala', port);
});