var assert = require('assert')
  , Fellowship = require('../')

describe('#removeResource', function () {

  it('should throw an error if group does not have resource', function () {
    var fellowship = new Fellowship()

    fellowship.addGroup('test', { test: 2 })

    assert.throws(fellowship.removeResource.bind(fellowship, 'test', 'a'), /Group test does not contain resource a/)
  })

  it('should successfully remove a resource', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    fellowship.removeResource('test', 'test')

    assert.equal(fellowship.getGroup('test').test, undefined)
  })

  it('should emit resource.removed', function (done) {
    var fellowship = new Fellowship()

    fellowship.on('resource.removed', function (groupName, resourceName) {
      assert.equal(groupName, 'test')
      assert.equal(resourceName, 'test')

      done()
    })

    fellowship.addResource('test', [ 'hello', 'foo', 'world' ])
    fellowship.addGroup('test', { test: 2 })
    fellowship.removeResource('test', 'test')

  })

})
