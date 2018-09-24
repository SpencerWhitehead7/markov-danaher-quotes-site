{
  document.getElementsByTagName(`button`)[0].addEventListener(`click`, async () => {
    try{
      const quoteContainerEle = document.getElementById(`quote-container`)
      const imageEle = document.getElementById(`image`)
      const [quoteData, imageData] = await Promise.all([
        fetch(`/api/generatequote`, {method : `POST`}),
        fetch(`api/getimage`, {method : `GET`}),
      ])
      const [quote, image] = await Promise.all([
        quoteData.text(),
        imageData.blob(),
      ])
      const src = URL.createObjectURL(image)
      imageEle.src = src

      const quoteContainerEleInnerHTML = `<b>danaherjohn </b>${quote}`
      quoteContainerEle.innerHTML = quoteContainerEleInnerHTML

      const timestampEle = document.getElementById(`timestamp`)
      const likesEle = document.getElementById(`likes`)
      const {timeStamp, likes} = generatePostedAndLikes()
      timestampEle.innerText = timeStamp
      likesEle.innerText = likes

      const instaEle = document.getElementById(`insta-tile-wrapper`)
      instaEle.style = `display:flex;`
    }catch(error){
      console.log(error)
    }
  })

  const generatePostedAndLikes = () => {
    const daysHours = Math.random() > 0.2 ? `DAYS` : `HOURS` // 20% chance for hours, 80% for days
    const ago = daysHours === `DAYS` ?
      Math.floor(Math.random() * 320) + 1 : // picked 320 as max days ago more or less at random
      Math.floor(Math.random() * 24) + 1
    const likes = daysHours === `DAYS` ?
      Math.floor(5000 + (Math.random() * 2000 * (Math.random() > 0.5 ? 1 : -1))) : // 5000 +/- 0-2000
      Math.floor((80 + (Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1))) * ago) // hours ago * (80 +/- 0-20)
    return {
      timeStamp : `${ago} ${daysHours} AGO`,
      likes : `${likes} likes`,
    }
  }
}
