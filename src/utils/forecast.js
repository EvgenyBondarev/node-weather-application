const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/b6eaa2a93416006aad9113b90e438f86/' +
		latitude +
		',' +
		longitude +
		'?units=si'

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error) {
			callback('Unable to find location', undefined)
		} else {
			callback(
				undefined,
                `${body.daily.data[0].summary}
                It is currently ${body.currently.temperature} Celsius degrees out. 
                Today's high is ${body.daily.data[0].temperatureHigh}.
                There is a ${body.currently.precipProbability} % chance of rain.`
			)
		}
	})
}

module.exports = forecast
