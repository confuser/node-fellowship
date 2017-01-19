const assert = require('assert')
    , createFellowship = require('../')

describe('#getResource', function () {

  it('should return an error if resource does not exist', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.getResource('test', function (error) {
        assert.strictEqual(error.message, 'Resource test does not exist')

        done()
      })
    })
  })

  it('should successfully return a resource', function (done) {
    let opts = { resources: { test: { hello: 1 } }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.getResource('test', function (error, resource) {
        if (error) return done(error)

        assert.equal(resource.hello, 1)

        done()
      })
    })
  })

})
