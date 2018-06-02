var conn = require('./conn');
var meta = require('./meta');
var cachetime = require('./cachetime');

var api = module.exports = {
  token: function(token) {
    if( !arguments.length ) return conn.header('X-Access-Token');
    conn.header('X-Access-Token', token);
    return this;
  },
  connection: function() {
    return conn;
  },
  endpoint: function(url) {
    if( !arguments.length ) return conn.endpoint();
    conn.endpoint(url);
    return this;
  },
  resolve: function(url) {
    return conn.resolve(url);
  },
  get: function(url, qry) {
    return conn.get(url, qry);
  },
  post: function(url, payload) {
    return conn.post(url, payload);
  },
  put: function(url, payload) {
    return conn.put(url, payload);
  },
  'delete': function(url, qry) {
    return conn['delete'](url, qry);
  },
  cachetime: function(timems) {
    if( !arguments.length ) return cachetime();
    cachetime(timems);
    return this;
  },
  session: function(done) {
    var session = window._bookable_session;
    var sessionchecked = window._bookable_session_ts;
    if( !arguments.length ) return session;
    if( session && new Date().getTime() - sessionchecked < cachetime() ) return done(null, session);
    
    conn.get('/auth').exec(function(err, session) {
      if( err ) return done(err);
      if( !session ) return done();
      if( !session.userid ) return done(new Error('userid was null'));
      
      window._bookable_session_ts = new Date().getTime();
      window._bookable_session = session;
      done(null, session);
    });
    return this;
  },
  connect: function(options, done) {
    conn.post('/auth', options).exec(function(err, result) {
      if( err ) return done(err);
      if( !result ) return done(new Error('auth failure, response was empty'));
      session = null;
      api.session(done);
    });
    return this;
  },
  info: function(options) {
    var id = options && options.id || meta('bookable.id');
    var serviceid = options && options.serviceid || meta('bookable.serviceid');
    var host = location.hostname;
  
    return api.get('/accommodation/info', {
      id: id,
      serviceid: serviceid,
      host: host
    }).localcache(cachetime());
  },
  accommodation: require('./accommodation')
};