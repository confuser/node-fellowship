var assert = require('assert')
  , Fellowship = require('../')

describe('#removePermission', function () {

  it('should throw an error if resource does not have permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    assert.throws(fellowship.removePermission.bind(fellowship, 'test', 'test', 'a'), /Permission a does not exist in test/)
  })

  it('should throw an error if group does not have permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    assert.throws(fellowship.removePermission.bind(fellowship, 'test', 'test', 'hello'), /Permission hello not defined within test/)
  })

  it('should successfully remove a permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })
    fellowship.addPermission('test', 'test', 'hello')

    assert.equal(fellowship.getGroup('test').test, 3)

    fellowship.removePermission('test', 'test', 'hello')

    assert.equal(fellowship.getGroup('test').test, 2)
  })

  it('should remove a resource if wildcard provided', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })
    fellowship.addPermission('test', 'test', 'hello')

    assert.equal(fellowship.getGroup('test').test, 3)

    fellowship.removePermission('test', 'test', '*')

    assert.equal(fellowship.getGroup('test').test, undefined)
  })

  it('should emit permission.removed', function (done) {
    var fellowship = new Fellowship()

    fellowship.on('permission.removed', function (groupName, resourceName, permissionName) {
      assert.equal(groupName, 'test')
      assert.equal(resourceName, 'test')
      assert.equal(permissionName, 'foo')

      done()
    })

    fellowship.addResource('test', [ 'hello', 'foo', 'world' ])
    fellowship.addGroup('test', { test: 2 })
    fellowship.removePermission('test', 'test', 'foo')

  })

})
