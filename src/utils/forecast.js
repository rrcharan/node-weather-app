const request = require('request')

// weather function
const forecast = (lat, long, callback) => {
    console.log(lat, long)
    const url = 'http://api.weatherstack.com/current?access_key=547a7db2abfd451f8cb3f22c88cbaa94&query='+ lat + ',' + long
    request ({url:url, json:true}, (error, response) => {
        if (error) {
            callback('unable to connect to service', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {
            // console.log(response.body)
            callback(undefined,'It is currently ' + response.body.current.weather_descriptions[0] + ' Temperarture is ' + response.body.current.temperature + ' degrees' + ' ' + 'Humidity is  ' + response.body.current.humidity)
        }
    })
}

// module export
module.exports = forecast