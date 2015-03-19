module.exports = function hasPermission(groupName, resourceName, permission) {
  var group = this.getGroup(groupName)
    , resource = this.getResource(resourceName)

  return group[resourceName] & resource[permission]
}
