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



module.exports = router;