const request = require('request')

// function - callabck is called with arguments 
const geocode = (address, callback) => {
    console.log('geocode')
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoicnJjaGFyYW4iLCJhIjoiY2ttcHFnOTF5MGplNDJucXBmc2c1MzFobSJ9.UmzkkDJ4qAYepJvf5XP0_A&limit=1'
    request ({url: url, json: true}, (error, response) => {
        if (error) {
            // implementing callback function
            callback('unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location services', undefined)    
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

// module export
module.exports = geocode
