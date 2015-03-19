var assert = require('assert')
  , Fellowship = require('../')

describe('#addGroup', function () {

  it('should throw an error if group exists', function () {
    var fellowship = new Fellowship()

    fellowship.addGroup('test', { test: 2 })

    assert.throws(fellowship.addGroup.bind(fellowship, 'test'), /Group test already exists/)
  })

  it('should successfully add a group', function () {
    var fellowship = new Fellowship()

    fellowship.addGroup('test', { test: 2 })

    assert.equal(fellowship.getGroup('test').test, 2)
  })

})
