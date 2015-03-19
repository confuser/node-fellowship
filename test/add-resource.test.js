var assert = require('assert')
  , Fellowship = require('../')

describe('#addResource', function () {

  it('should throw an error for no name', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.addResource, /Name must be a non-empty String/)
  })

  it('should throw an error for falsey values', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.addResource.bind(fellowship, ''), 'Name must be a non-empty String')
    assert.throws(fellowship.addResource.bind(fellowship, false), 'Name must be a non-empty String')
    assert.throws(fellowship.addResource.bind(fellowship, 0), 'Name must be a non-empty String')
    assert.throws(fellowship.addResource.bind(fellowship, null), 'Name must be a non-empty String')
  })

  it('should throw an error for non-array permissions', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.addResource.bind(fellowship, 'test', {}), /Permissions must be an Array of names/)
  })

  it('should throw an error if more than 31 permissions', function () {
    var fellowship = new Fellowship()

    assert.throws(fellowship.addResource.bind(fellowship, 'test', new Array(32))
      , /You may not have more than 31 permissions per resource/)
  })

  it('should throw an error if resource already exists', function () {
    var fellowship = new Fellowship()

    fellowship.addResource('test', [])

    assert.throws(fellowship.addResource.bind(fellowship, 'test', [])
      , /Resource test already exists/)
  })

})
