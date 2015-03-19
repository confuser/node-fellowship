module.exports = function (name) {
  var resource = this.resources[name]

  if (!resource) throw new Error('Resource ' + name + ' does not exist')

  return resource
}
