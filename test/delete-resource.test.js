const assert = require('assert')
    , createFellowship = require('../')

describe('#deleteResource', function () {

  it('should successfully delete a resource and all references in groups', function (done) {
    let opts = { resources: { test: {} }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.deleteResource('test', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.equal(group.test, undefined)

          done()
        })
      })
    })
  })

  it('should emit resource.deleted', function (done) {
    let opts = { resources: { test: {} }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('resource.deleted', function (name) {
        assert.equal(name, 'test')

        done()
      })

      fellowship.deleteResource('test', function (error) {
        if (error) return done(error)
      })
    })
  })

})
