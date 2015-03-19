# Fellowship

[![build status](https://secure.travis-ci.org/confuser/node-fellowship.png)](http://travis-ci.org/confuser/node-fellowship)
[![Coverage Status](https://coveralls.io/repos/confuser/node-fellowship/badge.png?branch=master)](https://coveralls.io/r/confuser/node-fellowship?branch=master)


An unopinionated bitwise memory based ACL. To be used as a low level base for implementing a persistant module.

## Installation

```
npm install fellowship --save
```

## Usage
```js
var Fellowship = require('fellowship')
  , resources = { resourceOne: { permission1: 1, permission2: 2, permission3: 4 }  }
  , groups = { Admin: { resourceOne: 6 }}
  , acl = new Fellowship(resources, groups)

acl.hasPermission('Admin', 'resourceOne', 'permission1') // false
acl.hasPermission('Admin', 'resourceOne', 'permission2') // true
acl.hasPermission('Admin', 'resourceOne', 'permission3') // true

// Moderator
acl.addResource('Blog', [ 'create,', 'read', 'update', 'delete' ])
acl.addGroup('Moderator')
acl.addPermission('Moderator', 'Blog', 'create')
acl.hasPermission('Moderator', 'Blog', 'create') // true
```

## Methods
### addGroup (name, [resourcePermissions])
* name - The identifier to the group, either a name or a data based id
* resourcePermissions - An optional object of permissions, e.g. `{ permission1: 1, permission2: 2, permission3: 4 }`

### addResource (name, permissions)
* name - The identifier to the resource, either a name or a data based id
* permissions - An array of permissions, e.g. `[ 'create,', 'read', 'update', 'delete' ]`

### addPermission (groupName, resourceName, permissionName)
* groupName - The identifier to the group, either a name or a data based id
* resourceName - The identifier to the resource, either a name or a data based id
* permissionName - Self explanatory, will throw an error if resource does not have such a permission

### getGroup (name)
* groupName - The identifier to the group, either a name or a data based id

Returns the groups resource permissions

### getResource (name)
* name - The identifier to the resource, either a name or a data based id

Returns the resources permissions and their associated 'bit' value

### hasPermission (groupName, resourceName, permissionName)
* groupName - The identifier to the group, either a name or a data based id
* resourceName - The identifier to the resource, either a name or a data based id
* permissionName - Self explanatory, will throw an error if resource does not have such a permission

Returns true if group has permission, false if not

### newPermission (resourceName, permissionName)
* resourceName - The identifier to the resource, either a name or a data based id
* permissionName - Self explanatory, will throw an error if resource does not have such a permission

Adds a new permission to the resource, maximum of 31 permissions per resource

## FAQ
### Why is there a limit on the amount of permissions per resource?
This is due to 32bit operations within JavaScript. If you find yourself needing a resource with more than 31 permissions, you should look into refactoring.

#### Bad
```js
fellowship.addResource('Forum', [ 'createtopic', 'createpost', 'locktopic' ])
```

#### Good
```js
fellowship.addResource('Topic', [ 'create', 'lock' ])
fellowship.addResource('Post', [ 'create', 'edit', 'delete' ])
```
