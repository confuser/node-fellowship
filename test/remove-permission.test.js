const assert = require('assert')
    , createFellowship = require('../')

describe('#removePermission', function () {

  it('should return an error if resource does not have permission', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.removePermission('test', 'test', 'a', function (error) {
        assert.strictEqual(error.message, 'Permission a does not exist in test')

        done()
      })
    })
  })

  it('should return an error if group does not have permission', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.removePermission('test', 'test', 'hello', function (error) {
        assert.strictEqual(error.message, 'Permission hello not defined within test')

        done()
      })
    })
  })

  it('should successfully remove a permission', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 3 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.removePermission('test', 'test', 'hello', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.equal(group.test, 2)

          done()
        })
      })
    })
  })

  it('should remove a resource if wildcard provided', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 3 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.removePermission('test', 'test', '*', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.strictEqual(group.test, undefined)

          done()
        })
      })
    })
  })

  it('should emit permission.removed', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 3 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('permission.removed', function (groupName, resourceName, permissionName) {
        assert.equal(groupName, 'test')
        assert.equal(resourceName, 'test')
        assert.equal(permissionName, 'hello')

        done()
      })

      fellowship.removePermission('test', 'test', 'hello', function (error) {
        if (error) return done(error)
      })
    })
  })

})
