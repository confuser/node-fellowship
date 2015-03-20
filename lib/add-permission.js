module.exports = function addPermission(groupName, resourceName, permission) {
  var group = this.getGroup(groupName)
    , resource = this.getResource(resourceName)
    , isWildcard = permission === '*'

  if (!isWildcard && !resource[permission]) throw new Error('Permission ' + permission + ' does not exist in ' + resourceName)

  if (this.hasPermission(groupName, resourceName, permission)) {
    throw new Error('Permission ' + permission + ' already exists in ' + groupName)
  }

  if (isWildcard) {
    group[resourceName] = '*'
  } else if (group[resourceName]) {
    group[resourceName] += resource[permission]
  } else {
    group[resourceName] = resource[permission]
  }

}
