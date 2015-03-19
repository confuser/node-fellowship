module.exports = function addResource(name, permissions) {

  if (!name || typeof name !== 'string' ) throw new Error('Name must be a non-empty String')

  if (!Array.isArray(permissions)) throw new Error('Permissions must be an Array of names')

  // 32 bit systems, but if you have more than 31, massive smell, consider refactoring your resources
  if (permissions.length > 31) throw new Error('You may not have more than 31 permissions per resource')

  if (this.resources[name]) throw new Error('Resource ' + name + ' already exists')

  var resource = {}

  // Optimisation instead of forEach
  for (var i = 0; i < permissions.length; i++) {
    // use defineProperty instead?
    resource[permissions[i]] = Math.pow(2, i)
  }

  this.resources[name] = resource
}
