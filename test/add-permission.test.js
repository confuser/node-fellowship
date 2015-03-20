var assert = require('assert')
  , Fellowship = require('../')

describe('#addPermission', function () {

  it('should throw an error if group has permission already', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    assert.throws(fellowship.addPermission.bind(fellowship, 'test', 'test', 'world'), /Permission world already exists in test/)
  })

  it('should successfully add a permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    fellowship.addPermission('test', 'test', 'hello')

    assert.equal(fellowship.getGroup('test').test, 3)
  })

  it('should successfully add a * permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test')

    fellowship.addPermission('test', 'test', '*')

    assert.equal(fellowship.getGroup('test').test, '*')
  })

})
