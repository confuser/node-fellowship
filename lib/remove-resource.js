module.exports = function removeResource(groupName, resourceName) {
  var group = this.getGroup(groupName)

  if (!group[resourceName]) throw new Error('Group ' + groupName + ' does not contain resource ' + resourceName)

  delete group[resourceName]

  this.emit('resource.removed', groupName, resourceName)

}
