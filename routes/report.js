var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var q           = require('q');
var mkdirp      = require('mkdirp');
var path        = require('path');
var fs          = require('fs');
var con         = require('../lib/db');
var helper      = require('../lib/helper');
var nsReport    = require('../lib/nsreport');
var router      = express.Router();

router.get('/', [bodyParser.json()], function(req, res){
	console.log("REPORT");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getInformData = function() {
    var sql = "select * from inform where issue_date = '" + param.p_date + "' limit 10";

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'pickup_'+ 'test' + '.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/pickup_report.js'), $scope.reportData);
    var stream = fs.createWriteStream(pdfFullPath);
    // console.log("stream = ", stream.corkedRequestsFree.finish);
    doc.pipe(stream);
    doc.end();
    stream.on('finish', function() {
      console.log("finish s");
      dfd.resolve();
    });
    stream.on('error', function() {
      console.log("error s");
      dfd.reject();
    });
    return dfd.promise;
   }

  db.beginTransaction()
 .then(getInformData)
 .then(renderReport)
 .then(function() {
   res.send({
     status:true,
     data: {
       pdfFile: 'http://localhost:9001/report/'+$scope.pdfFile,
       pickupId: 'test'
     }
   })
   // res.redirect('/report/' + $scope.pdfFile);
   console.log("Test Gen Report");
 }).catch(function(e) {
   res.send({
     status:false,
     error:e
   })
 });
});

router.post('/inform', [bodyParser.json()], function(req, res) {
  console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getInformData = function() {
    var sql = "select * from inform where issue_date = '" + param.p_date + "' limit 10";

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'pickup_'+ 'test' + '.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/pickup_report.js'), $scope.reportData);
    var stream = fs.createWriteStream(pdfFullPath);
    // console.log("stream = ", stream.corkedRequestsFree.finish);
    doc.pipe(stream);
    doc.end();
    stream.on('finish', function() {
    	console.log("finish s");
    	dfd.resolve();
    });
    stream.on('error', function() {
    	console.log("error s");
    	dfd.reject();
    });
    return dfd.promise;
   }

  db.beginTransaction()
 .then(getInformData)
 .then(renderReport)
 .then(function() {
   res.send({
     status:true,
     data: {
       pdfFile: 'http://localhost:9001/report/'+$scope.pdfFile,
       pickupId: 'test'
     }
   })
   // res.redirect('/report/' + $scope.pdfFile);
   console.log("Test Gen Report");
 }).catch(function(e) {
   res.send({
     status:false,
     error:e
   })
 });
});


router.post('/output_tax', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "SELECT "
            +   "r.issue_date"
            +   ", r.code"
            +   ", m.name_th"
            +   ", r.amount"
            +   ", r.vat_amount"
            +   ", r.amount+r.vat_amount as total_amount "
            +   ", r.total_amount as xx"
            +   ", r.status, CONCAT('วันที่ ','" + param.date_from + "',' ถึง ','" + param.date_to + "') as date_from_to "
            + "FROM receipt r "
            +   "JOIN member m ON r.mem_code=m.code "
            +   "JOIN period p ON r.period_code=p.code "
            + "WHERE "
            +   "p.p_date BETWEEN '" + param.date_from + "' AND '" + param.date_to + "' "
            +    "AND p.station_code = '" + param.station_code + "' "
            +  "ORDER BY r.issue_date, r.code ";

    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'output_tax.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/output_tax.js'), $scope.reportData);
    var stream = fs.createWriteStream(pdfFullPath);
    // console.log("stream = ", stream.corkedRequestsFree.finish);
    doc.pipe(stream);
    doc.end();
    stream.on('finish', function() {
      console.log("finish s");
      dfd.resolve();
    });
    stream.on('error', function() {
      console.log("error s");
      dfd.reject();
    });
    return dfd.promise;
   }

  db.beginTransaction()
 .then(getData)
 .then(renderReport)
 .then(function() {
   res.send({
     status:true,
     data: {
       pdfFile: 'http://localhost:9001/report/'+$scope.pdfFile,
       pickupId: 'test'
     }
   })
   // res.redirect('/report/' + $scope.pdfFile);
   console.log("Test Gen Report");
 }).catch(function(e) {
   res.send({
     status:false,
     error:e
   })
 });
});




router.post('/arrearage', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "SELECT "
            +   "r.issue_date"
            +   ", r.code"
            +   ", m.name_th"
            +   ", r.amount"
            +   ", r.vat_amount"
            +   ", r.amount+r.vat_amount as total_amount "
            +   ", r.total_amount as xx"
            +   ", r.status, CONCAT('วันที่ ','" + param.date_from + "',' ถึง ','" + param.date_to + "') as date_from_to "
            + "FROM receipt r "
            +   "JOIN member m ON r.mem_code=m.code "
            +   "JOIN period p ON r.period_code=p.code limit 100";

    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'output_tax.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/arrearage.js'), $scope.reportData);
    var stream = fs.createWriteStream(pdfFullPath);
    // console.log("stream = ", stream.corkedRequestsFree.finish);
    doc.pipe(stream);
    doc.end();
    stream.on('finish', function() {
      console.log("finish s");
      dfd.resolve();
    });
    stream.on('error', function() {
      console.log("error s");
      dfd.reject();
    });
    return dfd.promise;
   }

  db.beginTransaction()
 .then(getData)
 .then(renderReport)
 .then(function() {
   res.send({
     status:true,
     data: {
       pdfFile: 'http://localhost:9001/report/'+$scope.pdfFile,
       pickupId: 'test'
     }
   })
   // res.redirect('/report/' + $scope.pdfFile);
   console.log("Test Gen Report");
 }).catch(function(e) {
   res.send({
     status:false,
     error:e
   })
 });
});



module.exports = router;