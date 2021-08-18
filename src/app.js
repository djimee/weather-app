// server side JS
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// provides path of dir of current file
// console.log(__dirname)
// provides path of current file
// console.log(__filename)

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // set views path
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// localhost:3000/help.html will serve up help.html html page

// lets us configure what the server should do when someone sends a request
//get(route, function containing what we want to do when sent a request)
// req - request, res - response
// app.get('', (req, res) => {
//     res.send('<p>hi</p>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dipraj Jimee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dipraj Jimee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dipraj Jimee',
        msg: 'Help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    // callback hell!!!!
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({ 
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found',
        title: '404',
        name: 'Dipraj Jimee'
    })
})
// 404 page route handler
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found',
        title: '404',
        name: 'Dipraj Jimee'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
