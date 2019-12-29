let proto = {}
function defineGetter(target, property) {
  proto.__defineGetter__(property, function() {
    return this[target][property]
  })
}
function defineSetter(target, property) {
  proto.__defineSetter__(property, function(value) {
    this[target][property] = value
  })
}
// ctx.url => ctx.request.url
defineGetter('request', 'url')
defineGetter('request', 'path')

defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = proto
