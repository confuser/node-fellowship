module.exports = function removePermission(groupName, resourceName, permission) {
  var group = this.getGroup(groupName)
    , resource = this.getResource(resourceName)
    , isWildcard = permission === '*'

  if (isWildcard) return this.removeResource(groupName, resourceName)

  if (!resource[permission]) throw new Error('Permission ' + permission + ' does not exist in ' + resourceName)

  if (!this.hasPermission(groupName, resourceName, permission)) {
    throw new Error('Permission ' + permission + ' not defined within ' + groupName)
  }

  group[resourceName] -= resource[permission]

}
