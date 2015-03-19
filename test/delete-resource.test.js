var assert = require('assert')
  , Fellowship = require('../')

describe('#deleteResource', function () {

  it('should successfully delete a resource and all references in groups', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    assert.equal(fellowship.getGroup('test').test, 2)

    fellowship.deleteResource('test')

    assert.equal(fellowship.getGroup('test').test, undefined)
  })

})
