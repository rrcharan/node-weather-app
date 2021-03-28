const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
// port 
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials' )
// set hanlebar engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to use 
// app.use(express.static(publicDirectoryPath))
app.use(express.static(publicDirectoryPath))

// set up routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'charan'
    })
})

// about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'charan'
    })
})

// help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'How can i help?',
        name: 'charan'
    })
})

// app.com; app.com/help; app.com/about
// above will serve index.html
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// Help page use html file
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'charan',
//         age: 43
//     }, {
//         name: 'sarah',
//         age: 27
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// weather API

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       
            if (error) {
                 return res.send({
                     error
                 })
            } 
            
            // forecast(data.latitude, data.longitude, (error, forecastData) => {
               forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }  
        
                console.log(location)
                console.log(forecastData)
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
            error: 'you must provide search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

// 
app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'charan',
        errorMessage: 'Help Article not found'
    })
})

// 404 handler 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'charan',
        errorMessage: 'Page not found'
    })
})

// start the server

app.listen(port, () => {
    console.log('Server is up on port' + port)
})