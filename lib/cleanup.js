var fs          = require('fs');
var path        = require('path');
var moment      = require('moment');

var cleanup = function(dir, age, interval) {
  this.timer = null;
  this.dirList = dir;
  this.age = 3*24*60; // minute
  this.interval = interval || 5*60*1000 /*5min*/;
}

cleanup.prototype.run = function() {
  this.stop();
  this.start();
  this.timer = setInterval(this.start, this.interval);
}

cleanup.prototype.start = function() {
  var date = moment().subtract(this.age, 'm');
  this.dirList.forEach(function(dir) {
    fs.readdir(dir, function (err, files) {
    	if (err) {
        console.log('ERROR:', err);
        return;
      }
      files.forEach(function(file) {
        var fullname = dir + '/' + file;
        fs.stat(fullname, function(err, stats) {
          if (err) {
            console.log('ERROR2:', err);
            return;
          }
          if (moment(stats.mtime).isBefore(date)) {
            fs.unlink(fullname);
          }
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }.bind(this));
}

cleanup.prototype.stop = function() {
  if (this.timer != null) {
    clearInterval(this.timer);
    this.timer = null;
  }
}

module.exports = cleanup;
