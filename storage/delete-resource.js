module.exports = function deleteResource(resourceName, callback) {
  // Find and remove the resource from groups
  Object.keys(this.groups).forEach(function (groupName) {
    var group = this.groups[groupName]

    if (!group[resourceName]) return

    delete group[resourceName]

  }.bind(this))

  delete this.resources[resourceName]

  callback()
}
