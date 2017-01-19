module.exports = function newPermission(resourceName, permissionName, callback) {
  let resource = this.resources[resourceName]
    , permissionsLength = Object.keys(resource).length

  resource[permissionName] = Math.pow(2, permissionsLength)

  callback()
}
