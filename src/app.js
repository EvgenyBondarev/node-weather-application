const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		footer: 'Created by Evgeny Bondarev'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		footer: 'Created by Evgeny Bondarev'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		footer: 'Created by Evgeny Bondarev'
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address

	if (!address) {
		return res.send({
			error: 'You must provide your address'
		})
	}

	geocode(
		req.query.address,
		(
			error,
			{ latitude = 0, longitude = 0, location = 'Middle of Nowhere' } = {}
		) => {
			if (error) {
				return res.send({
					error
				})
			}

			forecast(latitude, longitude, (error, forecast) => {
				if (error) {
					return res.send({
						error
					})
				}

				res.send({
					address,
					forecast,
					location
				})
			})
		}
	)
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: 'Page Not Found'
	})
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))