const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1281d49c7ad19c3d2e397059a9a448c6&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services...', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search...', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature
                + ' degrees. It feels like ' + body.current.feelslike + ' degrees with a humidity of ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast
