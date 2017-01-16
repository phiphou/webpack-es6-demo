var exclude = ['./main.js']
var context = require.context('../../src/app', true, /\.js$/)
context.keys().forEach(key => {
  if (exclude.indexOf(key) === -1) context(key)
})
