const fs = require(`fs`)
const path = require(`path`)

const markovNum = 3

const markov = JSON.parse(fs.readFileSync(path.join(__dirname, `./markov${markovNum}.txt`))) 

const pickNextWord = prev => {
  const selector = Math.random()
  const nextWords = Object.keys(prev).filter(key => key !== `eNd5pLzNoCoL11s1oNs`)
  for(let i=0; i<nextWords.length; i++){
    if(selector >= prev[nextWords[i]][0] && selector < prev[nextWords[i]][1]) return nextWords[i]
  }
  return ``
}

const endSentence = prev => {
  const endWordsObj = prev.eNd5pLzNoCoL11s1oNs
  if(!endWordsObj){
    return pickNextWord(prev)
  }else{
    const endWords = Object.keys(prev.eNd5pLzNoCoL11s1oNs)
    const selector = Math.random()
    for(let i=0; i<endWords.length; i++){
      if(selector >= endWordsObj[endWords[i]][0] && selector < endWordsObj[endWords[i]][1]) return endWords[i]
    }
    return ``
  }
}

const generateSentence = prev => {
  const res = prev ? prev : pickNextWord(markov.sTaRt5pLzNoCoLl1s1oNs).split(` `)
  const length = 24
  for(let i=markovNum; i<length; i++){
    res.push(pickNextWord(markov[res.slice(-markovNum).join(` `)]))
  }
  while(res[res.length-1][res[res.length-1].length-1] !== `.` &&
  res[res.length-1][res[res.length-1].length-1] !== `!` &&
  res[res.length-1][res[res.length-1].length-1] !== `?`){
    res.push(endSentence(markov[res.slice(-markovNum).join(` `)]))
  }
  return prev ? res.slice(3).join(` `) : res.join(` `)
}

const generateQuoteBySentences = length => {
  let count = 1
  const sentences = [generateSentence()]
  while(count < length){
    const prev = sentences[sentences.length-1].split(` `).slice(-markovNum)
    sentences.push(generateSentence(prev))
    count++
  }
  return sentences.join(` `)
}

module.exports = generateQuoteBySentences
