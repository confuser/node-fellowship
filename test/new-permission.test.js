const assert = require('assert')
    , createFellowship = require('../')

describe('#newPermission', function () {

  it('should throw an error if more than 31 permissions', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      let permissions = []

      for (var i = 0; i < 31; i++) {
        permissions.push(i)
      }

      fellowship.addResource('test', permissions, function (error) {
        if (error) done(error)

        fellowship.newPermission('test', 'perm', function (error) {
          assert.strictEqual(error.message, 'You may not have more than 31 permissions per resource')

          done()
        })
      })
    })
  })

  it('should throw an error if permission already exists', function (done) {
    let opts = { resources: { test: { perm: 1 } }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.newPermission('test', 'perm', function (error) {
        assert.strictEqual(error.message, 'perm is already a defined permission')

        done()
      })
    })
  })

  it('should throw an error if permission is wildcard', function (done) {
    let opts = { resources: { test: {} }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.newPermission('test', '*', function (error) {
        assert.strictEqual(error.message, '* wildcard may not be a permission')

        done()
      })
    })
  })

  it('should emit permission.new', function (done) {
    let opts = { resources: { test: {} }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('permission.new', function (resourceName, permissionName) {
        assert.equal(resourceName, 'test')
        assert.equal(permissionName, 'bar')

        done()
      })

      fellowship.newPermission('test', 'bar', function (error) {
        if (error) return done(error)
      })
    })
  })

})
