module.exports = Fellowship

function Fellowship(resources, groups) {
  this.resources = resources || {}
  this.groups = groups || {}
}

Fellowship.prototype.addResource = require('./lib/add-resource')

Fellowship.prototype.newPermission = require('./lib/new-permission')

Fellowship.prototype.addGroup = require('./lib/add-group')

Fellowship.prototype.addPermission = require('./lib/add-permission')

Fellowship.prototype.deleteGroup = require('./lib/delete-group')

Fellowship.prototype.deletePermission = require('./lib/delete-permission')

Fellowship.prototype.deleteResource = require('./lib/delete-resource')

Fellowship.prototype.getResource = require('./lib/get-resource')

Fellowship.prototype.getGroup = require('./lib/get-group')

Fellowship.prototype.hasPermission = require('./lib/has-permission')

Fellowship.prototype.removePermission = require('./lib/remove-permission')

Fellowship.prototype.removeResource = require('./lib/remove-resource')
