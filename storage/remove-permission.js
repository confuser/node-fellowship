module.exports = function removePermission(groupName, resourceName, permission, callback) {
  this.groups[groupName][resourceName] -= this.resources[resourceName][permission]

  callback()
}
