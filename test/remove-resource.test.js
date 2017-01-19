const assert = require('assert')
    , createFellowship = require('../')

describe('#removeResource', function () {

  it('should return an error if group does not have resource', function (done) {
    let opts = { resources: {}, groups: { test: {} } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.removeResource('test', 'a', function (error) {
        assert.strictEqual(error.message, 'Group test does not contain resource a')

        done()
      })
    })
  })

  it('should successfully remove a resource', function (done) {
    let opts = { resources: { test: { hello: 1 } }, groups: { test: { test: 1 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.removeResource('test', 'test', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.strictEqual(group.test, undefined)

          done()
        })
      })
    })
  })

  it('should emit resource.removed', function (done) {
    let opts = { resources: { test: { hello: 1 } }, groups: { test: { test: 1 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('resource.removed', function (groupName, resourceName) {
        assert.equal(groupName, 'test')
        assert.equal(resourceName, 'test')

        done()
      })

      fellowship.removeResource('test', 'test', function (error) {
        if (error) return done(error)
      })
    })
  })

})
