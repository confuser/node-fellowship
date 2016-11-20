const assert = require('assert')
    , createFellowship = require('../')

describe('#addPermissions', function () {

  it('should return an error for non-array permissions', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addPermissions('test', 'test', {}, function (error) {
        assert.strictEqual(error.message, 'Permissions must be an Array of names')

        done()
      })
    })
  })

  it('should return an error if group has permission already', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addPermissions('test', 'test', [ 'world' ], function (error) {
        assert.strictEqual(error.message, 'Permission world already exists in test')

        done()
      })
    })
  })

  it('should successfully add permissions', function (done) {
    let opts = { resources: { test: { hello: 1, foo: 2, world: 4 } }, groups: { test: {} } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addPermissions('test', 'test', [ 'hello', 'world' ], function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.equal(group.test, 5)

          done()
        })
      })
    })
  })

  it('should emit permissions.added', function (done) {
    let opts = { resources: { test: { hello: 1, foo: 2, world: 4 } }, groups: { test: {} } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('permissions.added', function (groupName, resourceName, permissions) {
        assert.equal(groupName, 'test')
        assert.equal(resourceName, 'test')
        assert.deepEqual(permissions, [ 'hello', 'world' ])

        done()
      })

      fellowship.addPermissions('test', 'test', [ 'hello', 'world' ], function (error) {
        if (error) return done(error)

      })
    })
  })

})
