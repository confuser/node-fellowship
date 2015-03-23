var assert = require('assert')
  , Fellowship = require('../')

describe('#addPermissions', function () {

  it('should throw an error for non-array permissions', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.addPermissions.bind(fellowship, 'test', {}), /Permissions must be an Array of names/)
  })

  it('should throw an error if group has permission already', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    assert.throws(fellowship.addPermission.bind(fellowship, 'test', 'test', [ 'world' ]), /Permission world already exists in test/)
  })

  it('should successfully add permissions', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'foo', 'world' ])
    fellowship.addGroup('test')

    fellowship.addPermissions('test', 'test', [ 'hello', 'world' ])

    assert.equal(fellowship.getGroup('test').test, 5)
  })

  it('should emit permissions.added', function (done) {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'foo', 'world' ])
    fellowship.addGroup('test')

    fellowship.on('permissions.added', function (groupName, resourceName, permissions) {
      assert.equal(groupName, 'test')
      assert.equal(resourceName, 'test')
      assert.deepEqual(permissions, [ 'hello', 'world' ])

      done()
    })

    fellowship.addPermissions('test', 'test', [ 'hello', 'world' ])

    assert.equal(fellowship.getGroup('test').test, 5)
  })

})
