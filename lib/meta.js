module.exports = function(name, alt) {
  var tag = document.head.querySelector('meta[name="' + name + '"]');
  if( !tag ) return alt;

  var value = tag.getAttribute('content') || tag.getAttribute('value');
  return value && value.trim() || alt;
};
