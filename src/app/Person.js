class Person {

  constructor (person) {
    this.name = person.name.first
    this.gender = person.gender
    this.pictureUrl = person.picture ? person.picture.large : ''
    this.dob = person.dob
  }

  // template syntax using backticks and ${property}
  toText () {
    return `My name is ${this._name} and I'm ${this.Age()}.`
  }

  Age () {
    return ~~((Date.now() - new Date(this.dob)) / 31536000000)
  }

  get name () {
    return this._name
  }

  set name (newName) {
    if (newName) {
      this._name = newName.charAt(0).toUpperCase() + newName.substr(1)
    } else {
      throw new Error('user name cannot be set to null')
    }
  }

  // uncovered
  // uncovered() {
  //   // TODO cover this.
  // }
}

// ES6 module export
export default Person
