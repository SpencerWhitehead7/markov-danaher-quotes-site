const express = require(`express`)
const app = express()
const volleyball = require(`volleyball`)
const path = require(`path`)

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.listen(1337, () => console.log(`partying hard on http://localhost:1337/`))
