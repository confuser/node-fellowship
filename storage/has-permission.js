module.exports = function hasPermission(groupName, resourceName, permission, callback) {
  let resource = this.resources[resourceName]
    , groupValue = this.groups[groupName][resourceName]

  if (groupValue === '*') return callback(null, true)
  if (permission === '*' && groupValue !== '*') return callback(null, false)

  return callback(null, groupValue & resource[permission])
}
