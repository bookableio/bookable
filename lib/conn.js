var tinyget = require('tinyget');
var doc = global.document;

function meta(name, alt) {
  var tag = doc && doc.head.querySelector('meta[name="' + name + '"]');
  return (tag && tag.getAttribute('content')) || alt || null;
}

function token(value) {
  if( !global.localStorage ) return;
  if( !arguments.length ) return localStorage.getItem('accesstoken');
  localStorage.setItem('accesstoken', value);
}

module.exports = tinyget.branch(meta('bookable.endpoint', 'https://api.bookable.io'))
.rest()
.header('X-Access-Token', token());
