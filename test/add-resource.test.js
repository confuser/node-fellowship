const assert = require('assert')
    , createFellowship = require('../')

describe('#addResource', function () {

  it('should return an error for no name', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addResource(null, [], function (error) {
        assert.strictEqual(error.message, 'Name must be a non-empty String')

        done()
      })
    })
  })

  it('should return an error for non-array permissions', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addResource('test', {}, function (error) {
        assert.strictEqual(error.message, 'Permissions must be an Array of names')

        done()
      })
    })
  })

  it('should return an error if more than 31 permissions', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addResource('test', new Array(32), function (error) {
        assert.strictEqual(error.message, 'You may not have more than 31 permissions per resource')

        done()
      })
    })
  })

  it('should return an error if resource already exists', function (done) {
    let opts = { resources: { test: {} }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addResource('test', [], function (error) {
        assert.strictEqual(error.message, 'Resource test already exists')

        done()
      })
    })
  })

  it('should emit resource.added', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('resource.added', function (name, permissions) {
        assert.equal(name, 'test')
        assert.deepEqual(permissions, [ 'hello', 'foo', 'world' ])

        done()
      })

      fellowship.addResource('test', [ 'hello', 'foo', 'world' ], function (error) {
        if (error) return done(error)
      })
    })
  })

})
