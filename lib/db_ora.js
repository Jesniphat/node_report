var q = require('q');
var orawrap = require('orawrap');
var config = require('../config');

module.exports = {
  query: function(sql, param){
    var dfd = q.defer();
    var convert = function(result) {
      var fields = result.metaData.map(function(item) {
        return item.name.toLowerCase();
      });
      return result.rows.map(function(row) {
        var out = {};
        row.forEach(function(data, i) {
          out[fields[i]]  = data;
        });
        return out;
      });
    }

    orawrap.execute(sql, param, function(ex_err, results) {
      if (ex_err) { 
        console.error("\r\n");
        console.error("Date:", new Date());
        console.error("Query:", sql);
        console.error("Param:", param);
        console.error("Messages:", ex_err);
        dfd.resolve([]); 
      } else { 
        dfd.resolve(convert(results)); 
      }
    });
    return dfd.promise;
  },
  insert: function(sql, param, commit){
    var dfd = q.defer();
    var convert = function(result) {
      var fields = result.metaData.map(function(item) {
        return item.name.toLowerCase();
      });
      return result.rows.map(function(row) {
        var out = {};
        row.forEach(function(data, i) {
          out[fields[i]]  = data;
        });
        return out;
      });
    }

    orawrap.execute(sql, param, function(ex_err, results) {
      if (ex_err) { 
        console.error("\r\n");
        console.error("Date:", new Date());
        console.error("Insert:", sql);
        console.error("Param:", param);
        console.error("Messages:", ex_err);
        dfd.resolve([]);
        return;
      }
      if (commit) {
        orawrap.commit(function(commit_err, result) {
          if (commit_err) {
            console.error("\r\n");
            console.error("Date:", new Date());
            console.error("Commit:", sql);
            console.error("Param:", param);
            console.error("Messages:", commit_err);
            dfd.resolve([]);
            return;
          }
          dfd.resolve(results);
        })
      } else {
        dfd.resolve(results);
      }

    });
    return dfd.promise;
  },

}