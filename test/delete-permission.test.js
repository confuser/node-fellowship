const assert = require('assert')
    , createFellowship = require('../')

describe('#deletePermission', function () {

  it('should return an error if resource does not have permission', function (done) {
    let opts = { resources: { test: { hello: 1 } }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.deletePermission('test', 'test', function (error) {
        assert.strictEqual(error.message, 'test is not a defined permission')

        done()
      })
    })
  })

  it('should successfully delete a permission and recalculate group permissions', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2, foo: 4 } }, groups: { test: { test: 7 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.deletePermission('test', 'world', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done()

          assert.equal(group.test, 3)

          done()
        })
      })
    })
  })

  it('should emit permission.deleted', function (done) {
    let opts = { resources: { test: { hello: 1 } }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('permission.deleted', function (resourceName, permissionName) {
        assert.equal(resourceName, 'test')
        assert.deepEqual(permissionName, 'hello')

        done()
      })

      fellowship.deletePermission('test', 'hello', function (error) {
        if (error) return done(error)
      })
    })
  })

})
