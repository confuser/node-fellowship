var assert = require('assert')
  , Fellowship = require('../')

describe('#getGroup', function () {

  it('should throw an error if does not exist', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.getGroup.bind(fellowship, 'test'), /Group test does not exist/)
  })

  it('should successfully return a group', function () {
    var fellowship = new Fellowship()

    fellowship.addGroup('test', { test: 2 })

    assert.equal(fellowship.getGroup('test').test, 2)
  })

})
