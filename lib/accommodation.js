var URL = require('url');
var api = require('./conn').branch('accommodation');
var meta = require('./meta');
var cachetime = require('./cachetime');

module.exports = function(aid) {
  if( !aid ) return console.error('[accommodation] missing accommodation id');
  var accm = api.branch(aid).rest();
  
  return {
    rates: {
      rates: function(options) {
        return accm.get('/rates/rates', options).localcache(cachetime());
      },
      calc: function(options) {
        return accm.post('/rates/calc', options);
      },
      bookable: function(options) {
        return accm.get('/rates/bookable', options).localcache(cachetime());
      }
    },
    reservation: {
      validate: function(reservation) {
        return accm.post('/reservation/validate', reservation);
      },
      create: function(reservation) {
        return accm.post('/reservation', reservation);
      },
      prepare: function(reservation) {
        return accm.post('/reservation/prepare', reservation);
      },
      settlement: function(id) {
        return accm.put('/reservation/settlement/' + id);
      },
      settlementurl: function(id) {
        return accm.resolve('reservation/settlement/' + id);
      },
      inquiry: function(options) {
        return accm.get('/reservation/inquiry', options);
      },
      reqcancel: function(options) {
        return accm.put('/reservation/reqcancel', options);
      }
    }
  };
};