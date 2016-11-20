module.exports = function permissionExists(resourceName, permission, callback) {
  return callback(null, permission === '*' || this.resources[resourceName][permission])
}
