module.exports = function addResource(name, permissions, callback) {
  let resource = {}

  // Premature optimisation instead of forEach
  for (var i = 0; i < permissions.length; i++) {
    // use defineProperty instead?
    resource[permissions[i]] = Math.pow(2, i)
  }

  this.resources[name] = resource

  callback()
}
