'use strict'

function isObject (value) {
  return value === Object(value)
}

function isArray (value) {
  return Array.isArray(value)
}

function isFile (value) {
  return value instanceof File
}

function makeArrayKey (key, index) {
  if (key.length > 2 && key.lastIndexOf('[]') === key.length - 2) {
    return key
  } else {
    return key + '[' + index + ']'
  }
}

function objectToFormData (obj, fd, pre) {
  fd = fd || new FormData()

  Object.keys(obj).forEach(function (prop) {
    var key = pre ? (pre + '[' + prop + ']') : prop

    if (isObject(obj[prop]) && !isArray(obj[prop]) && !isFile(obj[prop])) {
      objectToFormData(obj[prop], fd, key)
    } else if (isArray(obj[prop])) {
      obj[prop].forEach(function (value, index) {
        var arrayKey = makeArrayKey(key, index)

        if (isObject(value) && !isFile(value)) {
          objectToFormData(value, fd, arrayKey)
        } else {
          fd.append(arrayKey, value)
        }
      })
    } else {
      if(obj[prop]!==null && obj[prop]!==undefined) {
          fd.append(key, obj[prop])
      }
    }
  })

  return fd
}

module.exports = objectToFormData
