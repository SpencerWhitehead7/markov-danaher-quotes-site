const express = require(`express`)
const volleyball = require(`volleyball`)
const path = require(`path`)

const generateQuote = require(`./generateQuote`)

const app = express()

app.use(volleyball)

app.use(`/`, express.static(path.join(__dirname, `../client`)))

app.post(`/api/:length`, (req, res, next) => {
  res.send(generateQuote(req.params.length))
})

app.get(`/*`, (req, res, next) => {
  res.redirect(`/`)
})

app.use((req, res, next) => {
  const err = new Error(`Page Not Found. How did you even make it past the redirect?`)
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500)
  res.send(err.message || `Internal Server Error`)
})

const PORT = process.env.PORT || 1337

app.listen(PORT, () => console.log(`\nPartying hard on http://localhost:${PORT}\n`))
