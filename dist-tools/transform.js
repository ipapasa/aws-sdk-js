var fs = require('fs');
var Transform = require('stream').Transform;
var collector = require('./service-collector');

module.exports = function(file) {
  var stream = new Transform();
  stream._transform = function(data, encoding, callback) {
    callback(null, data);
  };

  if (file.match(/\/lib\/browser\.js$/)) {
    var src = collector(process.env.AWS_SERVICES);
    stream._flush = function(callback) { stream.push(src); callback(); };
  }

  return stream;
};