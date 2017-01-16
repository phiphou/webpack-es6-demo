import '../style/style.sass'
import Person from './Person'

class Demo {

  constructor () {
    this.url = 'http://api.randomuser.me/?results='
    this.persons = ['bob']
  }

  parseResults (results) {
    let pa = []
    for (const person of results) {
      pa.push(new Person(person))
    }
    return pa
  }

  generatePersonsList (num = 1) {
    let self = this
    return new Promise((resolve, reject) => {
      self.callAPI(1, self.url).then(result => {
        self.persons = self.parseResults(result.results)
        resolve(self.persons)
      })
    })
  }

  filterAPIError (res) {
    return new Promise((resolve, reject) => {
      if (!res.ok || res.status !== 200) {
        reject('something wen wrong')
      } else {
        resolve(res.json())
      }
    })
  }

  callAPI (num, url) {
    let self = this
    return new Promise((resolve, reject) => {
      window.fetch('https://api.randomuser.me/?results=1', {credentials: 'omit'})
      .then(self.filterAPIError)
      .then(data => resolve(data))
    })
  }

  print () {
    let self = this
    return new Promise((resolve, reject) => {
      self.generatePersonsList().then(result => {
        let response = self.persons[0].toText()
        let picture = self.persons[0].pictureUrl
        document.querySelector('.avatar').src = picture
        document.querySelector('.result').innerHTML = response
        document.querySelector('.content').style.visibility = 'visible'
        resolve(true)
      })
    })
  }

}

// ES6 module export
export default Demo
