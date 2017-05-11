process.env.NLS_LANG = 'THAI_THAILAND.UTF8';

var oracledb = require('oracledb');
var config = require('../config');
var q = require('q');


//oracledb.connectionClass = 'SS';
oracledb.maxRows = config.oracledb.maxRows;

module.exports = {
  connect: function(setting) {
    var dfd = q.defer();
    setting = setting || {};

    config.oracledb.param.user = setting.user || config.oracledb.param.user; 
    config.oracledb.param.password = setting.password || config.oracledb.param.password;
    config.oracledb.param.connectString = setting.connectString || config.oracledb.param.connectString;

    oracledb.createPool(config.oracledb.param, function(error, pool){
      if (error) {
        console.error(error.message);
        dfd.reject(error);
        return;
      }
      //console.log('Pool=', pool.connectionsOpen, '/', pool.poolMax);
      pool.getConnection(function(error, conn) {
        if (error) {
          console.error(error.message);
          dfd.reject(error);
          return;
        }
        dfd.resolve(conn);
      });
    });
    return dfd.promise;
  },
  // connect: function() {
  //   var dfd = q.defer();
  //   oracledb.getConnection(config.oracledb.param, function(err, conn) {
  //     if (err) {
  //       console.error('ORACLE_ERROR=', err);
  //       dfd.reject(error);
  //       return;
  //     }
  //     dfd.resolve(conn);
  //   });
  //   return dfd.promise;
  // },
  query: function(conn, sql, param, commit) {
    var dfd = q.defer();
    var opt = {};
    conn.execute(sql, param, function(error, result) {
      if (error) {
        console.log('ERROR0:', error);
        dfd.reject();
        return;
      }
      if (commit) {
        conn.commit(function(error, result) {
          if (error) {
            console.log('ERROR0:', error);
            dfd.reject();
            return;
          }
          dfd.resolve(result);
        })
      } else {
        dfd.resolve(result);
      }
    });

    return dfd.promise;
  },

  close: function(conn) {
    var dfd = q.defer();
    conn.release(function(err) {
      if (err) {
        dfd.reject(err);
        return;
      }
      dfd.resolve();
    });
    return dfd.promise;
  },

  convert: function(result) {
    var fields = result.metaData.map(function(item) {
      return item.name.toLowerCase();
    });
    return result.rows.map(function(row) {
      var out = {};
      row.forEach(function(data, i) {
        out[fields[i]] = data;
      });
      return out;
    });
  }
}
