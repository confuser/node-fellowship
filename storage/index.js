module.exports = FellowshipMemory
module.exports.init = function (opts, callback) {
  if (!opts.resources) return callback(new Error('Missing resources'))
  if (!opts.groups) return callback(new Error('Missing groups'))

  return callback(null, new FellowshipMemory(opts.resources, opts.groups))
}

function FellowshipMemory(resources, groups) {
  this.resources = resources
  this.groups = groups
}

FellowshipMemory.prototype.permissionExists = require('./permission-exists')

FellowshipMemory.prototype.addResource = require('./add-resource')

FellowshipMemory.prototype.newPermission = require('./new-permission')

FellowshipMemory.prototype.addGroup = require('./add-group')

FellowshipMemory.prototype.addPermission = require('./add-permission')

FellowshipMemory.prototype.addPermissions = require('./add-permissions')

FellowshipMemory.prototype.deleteGroup = require('./delete-group')

FellowshipMemory.prototype.deletePermission = require('./delete-permission')

FellowshipMemory.prototype.deleteResource = require('./delete-resource')

FellowshipMemory.prototype.getResource = require('./get-resource')

FellowshipMemory.prototype.getGroup = require('./get-group')

FellowshipMemory.prototype.hasPermission = require('./has-permission')

FellowshipMemory.prototype.removePermission = require('./remove-permission')

FellowshipMemory.prototype.removeResource = require('./remove-resource')
