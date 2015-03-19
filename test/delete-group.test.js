var assert = require('assert')
  , Fellowship = require('../')

describe('#deleteGroup', function () {

  it('should throw an error if group does not exist', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.deleteGroup.bind(fellowship, 'exists'), /Group exists does not exist/)
  })

  it('should successfully delete a group', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'world' ])
    fellowship.addGroup('test', { test: 2 })

    assert.equal(fellowship.getGroup('test').test, 2)

    fellowship.deleteGroup('test')

    assert.throws(fellowship.deleteGroup.bind(fellowship, 'test'), /Group test does not exist/)
  })

})
