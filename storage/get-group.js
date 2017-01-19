module.exports = function getGroup(name, callback) {
  callback(null, this.groups[name])
}
