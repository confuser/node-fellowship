module.exports = function (name, callback) {
  callback(null, this.resources[name])
}
