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

  it('should emit group.added', function (done) {
    var fellowship = new Fellowship()

    fellowship.on('group.added', function (groupName, resourcePermissions) {
      assert.equal(groupName, 'test')
      assert.deepEqual(resourcePermissions, { test: 2 })

      done()
    })

    fellowship.addGroup('test', { test: 2 })
  })

})
