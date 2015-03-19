var assert = require('assert')
  , Fellowship = require('../')

describe('#getResource', function () {

  it('should throw an error if does not exist', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.getResource.bind(fellowship, 'test'), /Resource test does not exist/)
  })

  it('should successfully return a resource', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [ 'hello', 'test' ])

    assert.equal(fellowship.getResource('test').test, 2)
  })

})
