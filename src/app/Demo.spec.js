import 'whatwg-fetch'
import './../polyfills'
import Person from './Person'
import Demo from './Demo'
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
let sinonStubPromise = require('sinon-stub-promise')
sinonStubPromise(sinon)

describe('Testing Demo class', () => {
  let mockResult = [{
    name: {
      first: 'bob'
    },
    gender: 'male',
    picture: {large: ''},
    dob: '1972-09-05 23:27:14'
  }, {
    name: {
      first: 'jane'
    },
    gender: 'female',
    picture: {large: ''}
  }]

  describe('Testing generatePersonsList', () => {
    let demo
    beforeEach(() => {
      demo = new Demo()
      let response = {
        status: 200,
        results: mockResult}
      var res = new window.Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      })
      sinon.stub(window, 'fetch').returns(Promise.resolve(res))
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('should return a promise', () => {
      return expect(demo.generatePersonsList()).to.be.a('Promise')
    })

    it('eventually returns 2 results', function () {
      return expect(demo.generatePersonsList(2)).to.eventually.have.length(2)
    })
  })

  describe('Testing rejection', () => {
    let demo
    beforeEach(() => {
      let response = {status: 404}
      demo = new Demo()
      var res = new window.Response(JSON.stringify(response), {
        status: 404,
        headers: {
          'Content-type': 'application/json'
        }
      })
      sinon.stub(window, 'fetch').returns(Promise.resolve(res))
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('works with Promise.reject', function () {
      let err = 'something wen wrong'
      let response = {status: 404}
      // sinon.stub(demo, 'filterAPIError').returns(Promise.reject(err))
      return expect(demo.filterAPIError(response)).to.eventually.be.rejectedWith(err)
    })
  })

  describe('Testing generatePersonsList', () => {
    let demo
    beforeEach(function () {
      let response = {
        status: 200,
        results: mockResult}
      demo = new Demo()
      sinon.stub(demo, 'callAPI').returns(Promise.resolve(response))
    })
    it('results should be in persons array', function () {
      return demo.generatePersonsList().then(function (result) {
        expect(demo.persons).to.have.length(2)
        expect(demo.persons[0]).to.be.instanceof(Person)
      })
    })
  })

  describe('Testing DOM', () => {
    let demo
    beforeEach(function () {
      demo = new Demo()
      let response = {
        status: 200,
        results: mockResult}
      sinon.stub(demo, 'callAPI').returns(Promise.resolve(response))
      let fixture = '<div class="content" ><img class="avatar"><h2 class="result"></h2></div>'
      document.body.insertAdjacentHTML('afterbegin', fixture)
      demo.generatePersonsList()
    })
    it('results should be in DOM', function () {
      return demo.print().then(function (result) {
        let expectation = `My name is Bob and I'm ${demo.persons[0].Age()}.`
        expect(document.querySelector('.result').innerHTML).to.be.eql(expectation)
      })
    })
  })
})
