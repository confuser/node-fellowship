module.exports = function newPermission(resourceName, permissionName) {
  var resource = this.getResource(resourceName)
    , permissionsLength = Object.keys(resource).length

  if (permissionsLength === 31) throw new Error('You may not have more than 31 permissions per resource')
  if (resource[permissionName]) throw new Error(permissionName + ' is already a defined permission')
  if (permissionName === '*') throw new Error('* wildcard may not be a permission')

  resource[permissionName] = Math.pow(2, permissionsLength)

  this.emit('permission.new', resourceName, permissionName)
}
