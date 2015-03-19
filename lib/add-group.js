module.exports = function addGroup(name, resourcePermissions) {
  if (this.groups[name]) throw new Error('Group ' + name + ' already exists')

  this.groups[name] = resourcePermissions || {}
}
