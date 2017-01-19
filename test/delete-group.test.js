const assert = require('assert')
    , createFellowship = require('../')

describe('#deleteGroup', function () {

  it('should return an error if group does not exist', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.deleteGroup('exists', function (error) {
        assert.strictEqual(error.message, 'Group exists does not exist')

        done()
      })
    })
  })

  it('should successfully delete a group', function (done) {
    let opts = { resources: {}, groups: { test: {} } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.deleteGroup('test', function (error) {
        if (error) return done(error)

        fellowship.getGroup('test', function (error) {
          assert.strictEqual(error.message, 'Group test does not exist')

          done()
        })
      })
    })
  })

  it('should emit group.deleted', function (done) {
    let opts = { resources: {}, groups: { test: {} } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.on('group.deleted', function (name) {
        assert.equal(name, 'test')

        done()
      })

      fellowship.deleteGroup('test', function (error) {
        if (error) return done(error)
      })
    })
  })

})
