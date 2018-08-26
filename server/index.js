const express = require(`express`)
const app = express()
const volleyball = require(`volleyball`)
const path = require(`path`)

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(`/`, express.static(path.join(__dirname, `../client`)))

app.get(`/*`, (req, res, next) => {
  res.redirect(`/`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(`Mistakes were made.`)
})

app.use((req, res, next) => {
  res.status(404).send(`Nothing here. Sorry. Also, how did you get past the res.redirect?`)
})

app.listen(1337, () => console.log(`partying hard on http://localhost:1337/`))
