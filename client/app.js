const generateQuoteButton = document.getElementsByTagName(`button`)[0]
const selector = document.getElementsByTagName(`select`)[0]
const wisdom = document.getElementById(`wisdom`)

let length = 1

selector.addEventListener(`change`, event => {
  event.preventDefault()
  length = event.target.value
})

generateQuoteButton.addEventListener(`click`, async event => {
  event.preventDefault()
  try{
    const quoteData = await fetch(`/api/${length}`, {method : `POST`})
    const quote = await quoteData.text()
    wisdom.innerHTML = quote
  }catch(error){
    console.log(error)
  }
})
  
