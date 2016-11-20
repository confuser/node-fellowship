module.exports = function addPermissions(groupName, resourceName, permissions) {
  if (!Array.isArray(permissions)) throw new Error('Permissions must be an Array of names')

  permissions.forEach(function (permission) {
    this.addPermission(groupName, resourceName, permission)
  }.bind(this))

  this.emit('permissions.added', groupName, resourceName, permissions)
}
