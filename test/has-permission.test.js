var assert = require('assert')
  , Fellowship = require('../')

describe('#hasPermission', function () {

  it('should return false for non-existent permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])
    fellowship.addGroup('test', { test: 3 })

    assert.equal(fellowship.hasPermission('test', 'test', 'foo'), false)
  })

  it('should return true for permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])
    fellowship.addGroup('test', { test: 3 })

    assert.equal(fellowship.hasPermission('test', 'test', 'hello'), true)
  })

  it('should return true for group with wildcard permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])
    fellowship.addGroup('test', { test: '*' })

    assert.equal(fellowship.hasPermission('test', 'test', 'hello'), true)
  })

  it('should return false for * permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])
    fellowship.addGroup('test', { test: 1 })

    assert.equal(fellowship.hasPermission('test', 'test', '*'), false)
  })

})
