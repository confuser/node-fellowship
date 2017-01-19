module.exports = function removeResource(groupName, resourceName, callback) {
  delete this.groups[groupName][resourceName]

  callback()
}
