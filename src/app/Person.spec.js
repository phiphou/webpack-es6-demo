const assert = require('chai').assert

import Person from './Person'

describe('Testing Person Class', () => {
  let person

  beforeEach(() => {
    person = new Person({
      name: {
        first: 'bob'
      },
      gender: 'male',
      dob: '1972-09-05 23:27:14'
    })
  })

  it('user name cannot be set to null', () => {
    assert.throw(() => (person.name = null), Error)
  })

  it('user toText()', () => {
    assert.equal(person.toText(), `My name is ${person.name} and I'm ${person.Age()}.`,
      'more infos could be usefull\n')
  })
})
