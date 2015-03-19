var assert = require('assert')
  , Fellowship = require('../')

describe('#deletePermission', function () {

  it('should throw an error if resource does not have permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])

    assert.throws(fellowship.deletePermission.bind(fellowship, 'test', 'test'), /test is not a defined permission/)
  })

  it('should successfully delete a permission and recalculate group permissions', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world', 'foo' ])
    fellowship.addGroup('test')

    fellowship.addPermission('test', 'test', 'hello')
    fellowship.addPermission('test', 'test', 'world')
    fellowship.addPermission('test', 'test', 'foo')

    assert.equal(fellowship.getGroup('test').test, 7)

    fellowship.deletePermission('test', 'world')

    assert.equal(fellowship.getGroup('test').test, 3)
  })

})
