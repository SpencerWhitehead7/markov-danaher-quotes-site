const generateQuoteButton = document.getElementsByTagName(`button`)[0]
const selector = document.getElementsByTagName(`select`)[0]

let length = 1

generateQuoteButton.addEventListener(`click`, event => {
  console.log(`button attached!`)
  event.preventDefault()
})

selector.addEventListener(`change`, event => {
  console.log(`selector attached`)
  event.preventDefault()
  length = event.target.value
})
  
