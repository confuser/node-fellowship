module.exports = function getGroup(name) {
  var group = this.groups[name]

  if (!group) throw new Error('Group ' + name + ' does not exist')

  return group
}
