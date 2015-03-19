module.exports = function addPermission(groupName, resourceName, permission) {
  var group = this.getGroup(groupName)
    , resource = this.getResource(resourceName)

  if (!resource[permission]) throw new Error('Permission ' + permission + ' does not exist in ' + resourceName)
  if (group[resourceName] & resource[permission]) throw new Error('Permission ' + permission + ' already exists in ' + groupName)

  if (group[resourceName]) {
    group[resourceName] += resource[permission]
  } else {
    group[resourceName] = resource[permission]
  }

}
