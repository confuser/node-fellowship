module.exports = function deleteGroup(groupName) {
  this.getGroup(groupName)

  delete this.groups[groupName]

  this.emit('group.deleted', groupName)
}
