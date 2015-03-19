module.exports = function deletePermission(resourceName, permissionName) {
  var resource = this.getResource(resourceName)
    , value = resource[permissionName]

  if (!value) throw new Error(permissionName + ' is not a defined permission')

  var groupsAffected = []

  // Find and remove the permission from groups
  Object.keys(this.groups).forEach(function (groupName) {
    var group = this.getGroup(groupName)

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

  if (groupsAffected.length === 0) return

  groupsAffected.forEach(function (groupName) {
    var group = this.getGroup(groupName)

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
