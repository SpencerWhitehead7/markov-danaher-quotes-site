{
  const generateQuoteButton = document.getElementsByTagName(`button`)[0]
  const selector = document.getElementsByTagName(`select`)[0]
  const content = document.getElementById(`content`)

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
        content.append(wisdomEle)
        wisdomEle.innerText = quote
      }else{
        wisdom.innerText = quote
      }
    }catch(error){
      console.log(error)
    }
  })
}
