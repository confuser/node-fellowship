module.exports = function newPermission(resource, permissionName) {
  if (typeof resource === 'string') resource = this.getResource(resource)

  var permissionsLength = Object.keys(resource).length

  if (permissionsLength === 31) throw new Error('You may not have more than 31 permissions per resource')
  if (resource[permissionName]) throw new Error(permissionName + ' is already a defined permission')

  resource[permissionName] = Math.pow(2, permissionsLength)
}
