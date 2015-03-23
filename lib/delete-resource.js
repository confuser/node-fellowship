module.exports = function deleteResource(resourceName) {
  // Find and remove the resource from groups
  Object.keys(this.groups).forEach(function (groupName) {
    var group = this.getGroup(groupName)

    if (!group[resourceName]) return

    delete group[resourceName]

  }.bind(this))

  delete this.resources[resourceName]

  this.emit('resource.deleted', resourceName)
}
