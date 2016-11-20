module.exports = function addPermission(groupName, resourceName, permission, callback) {
  let self = this
    , isWildcard = permission === '*'

  self.getGroup(groupName, (error, group) => {
    if (error) return callback(error)

    if (isWildcard) {
      group[resourceName] = '*'

      return callback(null, groupName, resourceName, permission)
    }

    self.getResource(resourceName, (error, resource) => {
      if (error) return callback(error)

      if (group[resourceName]) {
        group[resourceName] += resource[permission]
      } else {
        group[resourceName] = resource[permission]
      }

      callback(null, groupName, resourceName, permission)
    })
  })
}
