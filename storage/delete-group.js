module.exports = function deleteGroup(groupName, callback) {
  delete this.groups[groupName]

  callback()
}
