module.exports = function addGroup(name, resourcePermissions, callback) {
  if (this.groups[name]) return callback(new Error('Group ' + name + ' already exists'))

  this.groups[name] = resourcePermissions

  callback(null, name, resourcePermissions)
}
