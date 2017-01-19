const assert = require('assert')
  , createFellowship = require('../')

describe('#addGroup', function () {

  it('should return an error if group exists', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addGroup('test', { test: 2 }, function (error) {
        assert.strictEqual(error.message, 'Group test already exists')

        done()
      })
    })
  })

  it('should successfully add a group', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.addGroup('test', { test: 2 }, function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error, group) {
          if (error) return done(error)

          assert.equal(group.test, 2)

          done()
        })
      })
    })
  })

  it('should emit group.added', function (done) {
    let opts = { resources: { test: { hello: 1, world: 2 } }, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('group.added', function (groupName, resourcePermissions) {
        assert.equal(groupName, 'test')

        assert.deepEqual(resourcePermissions, { test: 2 })

        done()
      })

      fellowship.addGroup('test', { test: 2 }, function (error) {
        if (error) return done(error)
      })
    })
  })

})
