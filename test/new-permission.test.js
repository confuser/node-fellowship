var assert = require('assert')
  , Fellowship = require('../')

describe('#newPermission', function () {
  it('should throw an error if more than 31 permissions', function () {
    var fellowship = new Fellowship()
      , permissions = []

    for (var i = 0; i < 31; i++) {
      permissions.push(i)
    }

    fellowship.addResource('test', permissions)

    assert.throws(fellowship.newPermission.bind(fellowship, 'test', 'perm')
      , /You may not have more than 31 permissions per resource/)
  })

  it('should throw an error if permission already exists', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [])
    fellowship.newPermission('test', 'perm')

    assert.throws(fellowship.newPermission.bind(fellowship, 'test', 'perm')
      , /perm is already a defined permission/)
  })

  it('should throw an error if permission is wildcard', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [])

    assert.throws(fellowship.newPermission.bind(fellowship, 'test', '*')
      , /\* wildcard may not be a permission/)
  })
})
