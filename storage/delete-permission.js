module.exports = function deletePermission(resourceName, permissionName, callback) {
  let resource = this.resources[resourceName]
    , value = resource[permissionName]

  var groupsAffected = []

  // Find and remove the permission from groups
  Object.keys(this.groups).forEach(function (groupName) {
    var group = this.groups[groupName]

    if (!group[resourceName]) return

    group[resourceName] -= value

    groupsAffected.push(groupName)
  }.bind(this))

  delete resource[permissionName]

  var oldPerms = {}

  // Recalculate
  Object.keys(resource).forEach(function (permission, i) {
    oldPerms[permission] = resource[permission]
    resource[permission] = Math.pow(2, i)
  })

  if (groupsAffected.length !== 0) {

    groupsAffected.forEach(function (groupName) {
      var group = this.groups[groupName]

      Object.keys(oldPerms).forEach(function (permission) {
        var oldValue = oldPerms[permission]
          , newValue = resource[permission]

        if (group[resourceName] & oldValue) {
          group[resourceName] -= oldValue
          group[resourceName] += newValue
        }
      })
    }.bind(this))
  }

  callback()
}
