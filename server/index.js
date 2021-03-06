const express = require(`express`)
const volleyball = require(`volleyball`)
const path = require(`path`)

const generateQuote = require(`./generateQuote`)

const app = express()

// Logging middleware
app.use(volleyball)

// Static file serving middleware
app.use(express.static(path.join(__dirname, `../client`)))

// API call to generate quote
app.post(`/api/generatequote`, (req, res, next) => {
  res.send(generateQuote(5))
})

app.get(`/api/getimage`, (req, res, next) => {
  const imageNo = Math.round(Math.random() * 47)
  res.sendFile(path.join(__dirname, `images/image${imageNo}.png`))
})

// All other requests
app.get(`*`, (req, res, next) => {
  res.redirect(`/`)
})

// 404 response
app.use((req, res, next) => {
  const err = new Error(`Page Not Found. How did you even make it past the redirect?`)
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500)
  res.send(err.message || `Internal Server Error`)
})

// Define port
const PORT = process.env.PORT || 1337

// Start server
app.listen(PORT, () => console.log(`\nPartying hard on http://localhost:${PORT}\n`))
