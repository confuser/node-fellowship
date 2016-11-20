const assert = require('assert')
    , createFellowship = require('../')

describe('#hasPermission', function () {

  it('should return false for non-existent permission', function (done) {
    let opts = { resources: { test: { hello: 1, test: 2 } }, groups: { test: { test: 3 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.hasPermission('test', 'test', 'foo', function (error, hasPermission) {
        if (error) return done(error)

        assert(!hasPermission)

        done()
      })
    })
  })

  it('should return true for permission', function (done) {
    let opts = { resources: { test: { hello: 1, test: 2 } }, groups: { test: { test: 3 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.hasPermission('test', 'test', 'hello', function (error, hasPermission) {
        if (error) return done(error)

        assert(hasPermission)

        done()
      })
    })
  })

  it('should return true for group with wildcard permission', function (done) {
    let opts = { resources: { test: { hello: 1, test: 2 } }, groups: { test: { test: '*' } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.hasPermission('test', 'test', 'hello', function (error, hasPermission) {
        if (error) return done(error)

        assert(hasPermission)

        done()
      })
    })
  })

  it('should return false for wildcard permission', function (done) {
    let opts = { resources: { test: { hello: 1, test: 2 } }, groups: { test: { test: 1 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.hasPermission('test', 'test', '*', function (error, hasPermission) {
        if (error) return done(error)

        assert(!hasPermission)

        done()
      })
    })
  })

})
