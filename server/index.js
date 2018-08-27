'use strict'

const express = require(`express`)
const app = express()
const volleyball = require(`volleyball`)
const path = require(`path`)
const generateQuote = require(`./generateQuote`)

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(`/`, express.static(path.join(__dirname, `../client`)))

app.post(`/api/:length`, (req, res, next) => {
  res.send(generateQuote(req.params.length))
})

app.get(`/*`, (req, res, next) => {
  res.redirect(`/`)
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || `Internal Server Error`)
})

app.use((req, res, next) => {
  res.status(404).send(`Nothing here. Sorry. Also, how did you get past the res.redirect?`)
})

const PORT = process.env.PORT || 1337

app.listen(PORT, () => console.log(`\nPartying hard on http://localhost:${PORT}\n`))
