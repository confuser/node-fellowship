const { EventEmitter } = require('events')
    , { inherits } = require('util')
    , asyncEach = require('async.each')
    , memoryStorage = require('./storage')

module.exports = function (opts, callback) {
  return new Fellowship(opts, callback)
}

function Fellowship(opts, callback) {
  let store = opts.store || memoryStorage

  EventEmitter.call(this)

  store.init(opts, (error, storage) => {
    if (error) return callback(error)
    if (!storage) return callback(new Error('Storage failed to initialise'))

    this.store = storage

    callback(null, this)
  })
}

inherits(Fellowship, EventEmitter)

Fellowship.prototype.addResource = function (name, permissions, callback) {
  if (!name || typeof name !== 'string') return callback(new Error('Name must be a non-empty String'))
  if (!Array.isArray(permissions)) return callback(new Error('Permissions must be an Array of names'))
  // 32 bit systems, but if you have more than 31, massive smell, consider refactoring your resources
  if (permissions.length > 31) return callback(new Error('You may not have more than 31 permissions per resource'))

  this.store.getResource(name, (error, exists) => {
    if (error) return callback(error)
    if (exists) return callback(new Error(`Resource ${name} already exists`))

    this.store.addResource(name, permissions, (error) => {
      if (error) return callback(error)

      this.emit('resource.added', name, permissions)

      callback(null, name, permissions)
    })
  })
}

Fellowship.prototype.newPermission = function (resourceName, permissionName, callback) {
  this.getResource(resourceName, (error, resource) => {
    if (error) return callback(error)

    let permissionsLength = Object.keys(resource).length

    if (permissionsLength === 31) return callback(new Error('You may not have more than 31 permissions per resource'))
    if (resource[permissionName]) return callback(new Error(`${permissionName} is already a defined permission`))
    if (permissionName === '*') return callback(new Error('* wildcard may not be a permission'))

    this.store.newPermission(resourceName, permissionName, (error) => {
      if (error) return callback(error)

      this.emit('permission.new', resourceName, permissionName)

      callback(null, resourceName, permissionName)
    })
  })
}

Fellowship.prototype.addGroup = function (name, resourcePermissions, callback) {
  if (!callback) {
    callback = resourcePermissions
    resourcePermissions = {}
  }

  this.store.getGroup(name, (error, group) => {
    if (error) return callback(error)
    if (group) return callback(new Error(`Group ${name} already exists`))

    this.store.addGroup(name, resourcePermissions, (error) => {
      if (error) return callback(error)

      this.emit('group.added', name, resourcePermissions)

      callback(null, name, resourcePermissions)
    })
  })

}

Fellowship.prototype.addPermission = function (groupName, resourceName, permission, callback) {

  this.permissionExists(resourceName, permission, (error, permissionExists) => {
    if (error) return callback(error)

    let isWildcard = permission === '*'

    if (!isWildcard && !permissionExists) {
      return callback(new Error(`Permission ${permission} does not exist in ${resourceName}`))
    }

    this.hasPermission(groupName, resourceName, permission, (error, hasPermission) => {
      if (error) return callback(error)
      if (hasPermission) return callback(new Error(`Permission ${permission} already exists in ${groupName}`))

      this.store.addPermission(groupName, resourceName, permission, (error, groupName, resourceName, permission) => {
        if (error) return callback(error)

        this.emit('permission.added', groupName, resourceName, permission)

        callback(null, groupName, resourceName, permission)
      })
    })
  })
}

Fellowship.prototype.permissionExists = function (resourceName, permission, callback) {
  this.store.permissionExists(resourceName, permission, callback)
}

Fellowship.prototype.addPermissions = function (groupName, resourceName, permissions, callback) {
  if (!Array.isArray(permissions)) return callback(new Error('Permissions must be an Array of names'))

  asyncEach(permissions, (permission, eachCb) => {
    this.addPermission(groupName, resourceName, permission, eachCb)
  }, (error) => {
    // @TODO handle rollback if error?
    if (error) return callback(error)

    this.emit('permissions.added', groupName, resourceName, permissions)

    callback(null, groupName, resourceName, permissions)
  })
}

Fellowship.prototype.deleteGroup = function (groupName, callback) {
  this.getGroup(groupName, (error) => {
    if (error) return callback(error)

    this.store.deleteGroup(groupName, (error) => {
      if (error) callback(error)

      this.emit('group.deleted', groupName)

      callback(null, groupName)
    })
  })
}

Fellowship.prototype.deletePermission = function (resourceName, permissionName, callback) {
  this.store.permissionExists(resourceName, permissionName, (error, permissionExists) => {
    if (error) return callback(error)
    if (!permissionExists) return callback(new Error(permissionName + ' is not a defined permission'))

    this.store.deletePermission(resourceName, permissionName, (error) => {
      if (error) return callback(error)

      this.emit('permission.deleted', resourceName, permissionName)

      callback(null, resourceName, permissionName)
    })
  })
}

Fellowship.prototype.deleteResource = function (resourceName, callback) {
  this.store.deleteResource(resourceName, (error) => {
    if (error) return callback(error)

    this.emit('resource.deleted', resourceName)

    callback(null, resourceName)
  })
}

Fellowship.prototype.getResource = function (name, callback) {
  this.store.getResource(name, (error, resource) => {
    if (error) return callback(error)
    if (!resource) return callback(new Error(`Resource ${name} does not exist`))

    callback(null, resource)
  })
}

Fellowship.prototype.getGroup = function (name, callback) {
  this.store.getGroup(name, (error, group) => {
    if (error) return callback(error)
    if (!group) return callback(new Error(`Group ${name} does not exist`))

    callback(null, group)
  })
}

Fellowship.prototype.hasPermission = function (groupName, resourceName, permission, callback) {
  this.store.hasPermission(groupName, resourceName, permission, callback)
}

Fellowship.prototype.removePermission = function (groupName, resourceName, permission, callback) {
  this.getResource(resourceName, (error, resource) => {
    if (error) return callback(error)

    let isWildcard = permission === '*'

    if (isWildcard) {
      return this.removeResource(groupName, resourceName, (error) => {
        if (error) return callback(error)

        this.emit('permission.removed', groupName, resourceName, permission)

        callback()
      })
    }

    if (!resource[permission]) return callback(new Error(`Permission ${permission} does not exist in ${resourceName}`))

    this.hasPermission(groupName, resourceName, permission, (error, hasPermission) => {
      if (error) return callback(error)
      if (!hasPermission) return callback(new Error(`Permission ${permission} not defined within ${groupName}`))

      this.store.removePermission(groupName, resourceName, permission, (error) => {
        if (error) return callback(error)

        this.emit('permission.removed', groupName, resourceName, permission)

        callback()
      })
    })
  })
}

Fellowship.prototype.removeResource = function removeResource(groupName, resourceName, callback) {
  this.getGroup(groupName, (error, group) => {
    if (error) return callback(error)
    if (!group[resourceName]) return callback(new Error(`Group ${groupName} does not contain resource ${resourceName}`))

    this.store.removeResource(groupName, resourceName, (error) => {
      if (error) return callback(error)

      this.emit('resource.removed', groupName, resourceName)

      callback(null, groupName, resourceName)
    })
  })
}
