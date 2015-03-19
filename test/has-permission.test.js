var assert = require('assert')
  , Fellowship = require('../')

describe('#hasPermission', function () {

  it('should return false for non-existent permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])
    fellowship.addGroup('test', { test: 3 })

    assert.equal(fellowship.hasPermission('test', 'test', 'foo'), false)
  })

  it('should true for permission', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])
    fellowship.addGroup('test', { test: 3 })

    assert.equal(fellowship.hasPermission('test', 'test', 'hello'), true)
  })

})
