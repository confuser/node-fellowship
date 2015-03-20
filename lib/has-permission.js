module.exports = function hasPermission(groupName, resourceName, permission) {
  var group = this.getGroup(groupName)
    , resource = this.getResource(resourceName)
    , groupValue = group[resourceName]

  if (groupValue === '*') return true
  if (permission === '*' && groupValue !== '*' ) return false

  return groupValue & resource[permission]
}
