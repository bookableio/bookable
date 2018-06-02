var cachetime = 5000;

module.exports = function(time) {
  if( !arguments.length ) return cachetime || 0;
  cachetime = time;
};