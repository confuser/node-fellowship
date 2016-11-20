const assert = require('assert')
    , createFellowship = require('../')

describe('#getGroup', function () {

  it('should return an error if does not exist', function (done) {
    let opts = { resources: {}, groups: {} }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.getGroup('test', function (error) {
        assert.strictEqual(error.message, 'Group test does not exist')

        done()
      })
    })
  })

  it('should successfully return a group', function (done) {
    let opts = { resources: {}, groups: { test: { test: 2 } } }

    createFellowship(opts, (error, fellowship) => {
      if (error) return done(error)

      fellowship.getGroup('test', function (error, group) {
        if (error) return done(error)

        assert.equal(group.test, 2)

        done()
      })
    })
  })

})
