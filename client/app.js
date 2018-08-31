const generateQuoteButton = document.getElementsByTagName(`button`)[0]
const selector = document.getElementsByTagName(`select`)[0]
const githubLink = document.getElementById(`github-link`)

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
    const wisdom = document.getElementById(`wisdom`)
    if(!wisdom){
      const wisdomEle = document.createElement(`div`)
      wisdomEle.id = `wisdom`
      wisdomEle.classList.add(`center-wrapper`)
      githubLink.parentNode.insertBefore(wisdomEle, githubLink)
      wisdomEle.innerText = quote
    }else{
      wisdom.innerText = quote
    }
  }catch(error){
    console.log(error)
  }
})
  
