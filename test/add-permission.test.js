const assert = require('assert')
  , createFellowship = require('../')

describe('#addPermission', function () {

  it('should return an error if group has permission already', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addPermission('test', 'test', 'world', function (error) {
        assert.strictEqual(error.message, 'Permission world already exists in test')

        done()
      })
    })
  })

  it('should successfully add a permission', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addPermission('test', 'test', 'hello', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.equal(group.test, 3)

          done()
        })
      })
    })
  })

  it('should successfully add a * permission', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addPermission('test', 'test', '*', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.equal(group.test, '*')

          done()
        })
      })
    })
  })

  it('should emit permission.added', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('permission.added', function (groupName, resourceName, permission) {
        assert.equal(groupName, 'test')
        assert.equal(resourceName, 'test')
        assert(permission, '*')

        done()
      })

      fellowship.addPermission('test', 'test', '*', function (error) {
        if (error) return done(error)
      })
    })
  })

})
