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
    var sql = "select distinct inv.mem_code,inv.name,inv.amount,inv.vat_amount,inv.total_amount,inv.code,rc.mem_code as mem, "
            + "ini.prod_code, pd.name prod_name, inv.issue_date, CONCAT(ini.prod_code , ':' , pd.name) as codename, "
            + "CONCAT('วันที่: ' , '" + param['date_from'] + "' , ' ถึง ' , '" + param['date_to'] + "') as datehead "
            + "from invoice as inv inner join invoice_item as ini on inv.code = ini.invoice_code "
            + "left join receipt as rc on inv.mem_code = rc.mem_code "
            + "left join product pd on ini.prod_code = pd.code "
            + "inner join member m on inv.mem_code = m.code "
            + "where inv.issue_date between '" + param['date_from'] + "' and '" + param['date_to'] + "' "
            + "and inv.mem_code between '" + param['mem_from'] + "' and '" + param['mem_to'] + "' "
            + "and ini.prod_code = '" + param['productcode'] + "' and inv.`status` = 'WAIT' and m.is_active = 'YES'  order by inv.code";

    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var all_vat = 0;
        var all_amount = 0;
        var all_total_amount = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          all_vat += $scope.reportData[i].vat_amount;
          all_amount += $scope.reportData[i].amount;
          all_total_amount += $scope.reportData[i].total_amount;
        }
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].vat_amount = ($scope.reportData[i].vat_amount).toFixed(2);
          $scope.reportData[i].amount = ($scope.reportData[i].amount).toFixed(2);
          $scope.reportData[i].total_amount = ($scope.reportData[i].total_amount).toFixed(2);

          $scope.reportData[i].all_vat = all_vat.toFixed(2);
          $scope.reportData[i].all_amount = all_amount.toFixed(2);
          $scope.reportData[i].all_total_amount = all_total_amount.toFixed(2);
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'arrearage.pdf';
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


router.post('/payment1', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var prodCode = ""
    if(param.productcode.length > 0){
      prodCode = " AND ri.prod_code in ('" + param.productcode.join("','") + "') ";
    }
    var sql = "SELECT r.mem_code,r.name,r.code,r.total_amount,r.issue_date,sum(ri.qty) qty "
            + "FROM receipt as r inner join receipt_item as ri on r.code = ri.receipt_code "
            + "WHERE r.issue_date BETWEEN  '" + param.date_from + "'  AND  '" + param.date_to + "' AND r.mem_code BETWEEN '" + param.mem_from + "' "
            + "AND '" + param.mem_to + "' " + prodCode
            + "group by r.mem_code,r.name,r.code,r.total_amount,r.issue_date order by r.mem_code ";

    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var all_qty = 0;
        var all_pax = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          all_qty = i;
          all_pax += $scope.reportData[i].total_amount;
        }
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].all_qty = all_qty+1;
          $scope.reportData[i].all_pax = all_pax.toFixed(2);
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'payment.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/payment.js'), $scope.reportData);
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



router.post('/card_new_tx_list', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "SELECT '" + param.mem_text + "' mem_text,tx.*, c.card_number, c.`type`, "
            + "IFNULL(r.name,(select name_th from member where code = substr(tx.acc_code,2,5))) name, tx.is_newcard, "
            + "CONCAT('วันที่: ' , '" + param.date_from + "' , ' ถึง ' , '" + param.date_to + "') as headdate, "
            + "CONCAT('" + param.mem_from + "' , '" + param.mem_to + "') as headcode, " 
            + "CASE WHEN '" + param.is_newcard + "' = 'YES' THEN 'new card' ELAE '" + param.is_newcard + "' as isnewhead "
            + "FROM card_account_tx tx LEFT JOIN carddb c ON tx.card_code=c.code LEFT JOIN receipt r ON tx.ref1_code=r.code "
            + "WHERE tx.tx_date BETWEEN '" + param.date_from + "' AND '" + param.date_to + "' "
            + "AND tx.acc_code BETWEEN '" + param.mem_from + "' AND '" + param.mem_to + "' AND tx.tx_type='ISSUE' "
            + "AND tx.is_newcard = '" + param.is_newcard + "' ORDER BY tx.code";

    // var sql = "select * from inform order by id desc limit 50"

    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var all_qty = 0;
        var all_pax = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          all_qty = i;
          all_pax += $scope.reportData[i].total_amount;
        }
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].all_qty = all_qty+1;
          $scope.reportData[i].all_pax = all_pax.toFixed(2);
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'newcard.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/newcard.js'), $scope.reportData);
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


router.post('/card_new_tx_list1', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "SELECT '" + param.mem_text + "' mem_text,tx.*, c.card_number, c.`type`, "
            + "IFNULL(r.name,(select name_th from member where code = substr(tx.acc_code,2,5))) name, tx.is_newcard, "
            + "CONCAT('วันที่: ' , '" + param.date_from + "' , ' ถึง ' , '" + param.date_to + "') as headdate, "
            + "CONCAT('" + param.mem_from + "' , '" + param.mem_to + "') as headcode, " 
            + "'' as isnewhead "
            + "FROM card_account_tx tx LEFT JOIN carddb c ON tx.card_code=c.code LEFT JOIN receipt r ON tx.ref1_code=r.code "
            + "WHERE tx.tx_date BETWEEN '" + param.date_from + "' AND '" + param.date_to + "' "
            + "AND tx.acc_code BETWEEN '" + param.mem_from + "' AND '" + param.mem_to + "' AND tx.tx_type='ISSUE' "
            + "ORDER BY tx.code";

    // var sql = "select * from inform order by id desc limit 50"

    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var all_qty = 0;
        var all_pax = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          all_qty = i;
          all_pax += $scope.reportData[i].total_amount;
        }
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].all_qty = all_qty+1;
          $scope.reportData[i].all_pax = all_pax.toFixed(2);
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'newcard.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/newcard.js'), $scope.reportData);
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


router.post('/sportCheckPrint', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);

  if(!param.checker){
    param.checker = "All_User";
  }


  var getData = function() {
    var sql = "SELECT group_concat(DISTINCT i.code ORDER BY i.code SEPARATOR ',') code "
            +  "   ,group_concat(DISTINCT i.ref_code ORDER BY i.ref_code SEPARATOR ',') ref_code "
            +  "    , i.mem_code, concat(m.name_th, ' - ', i.group_name) mem_name, i.is_domestic, i.flight "
            +  "    , group_concat(b.license ORDER BY b.license separator ', ') license_list "
            +  "    , max(i.total_pax) total_pax, max(b.done_time) last_time "
            +  "    , i.check_status, max(i.check_pax) check_pax, max(i.check_pax_child) check_pax_child "
            +  "    , max(i.check_pax_leader) check_pax_leader "
            +  "    , max(i.check_pax)+max(i.check_pax_child)+max(i.check_pax_leader) total, i.check_by, CONCAT('วันที่: ' , '" + param.p_date + "' , ' ถึง ' , '" + param.p_date2 + "') as datehead "
            +  "FROM inform i INNER JOIN buscall b ON i.code=b.inform_code "
            +  "  INNER JOIN member m ON i.mem_code=m.code "
            +  "WHERE b.airport= '" + param.airport + "' AND b.status='DONE' "
            +  "  AND (i.issue_date between '" + param.p_date + "' AND '" + param.p_date2 + "') "
            +  "  AND (CASE WHEN '" + param.p_type + "' = 'ALL' THEN i.period_code = i.period_code ELSE i.period_code LIKE '" + param.p_type + "' END) "
            +  "  AND (CASE WHEN '" + param.checker + "' = 'All_User' THEN i.check_by = i.check_by ELSE i.check_by = '" + param.checker + "' END) "
            +  "  AND i.check_status = 'YES' "
            +  "GROUP BY i.mem_code, i.group_name, i.flight,  i.is_domestic, i.check_status "
            +  "ORDER BY i.check_by, max(b.done_time) DESC ";


    // var sql = "select * from inform order by id desc  limit 50";
    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var all_qty = 0;
        var all_pax = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          // all_qty = i;
          // all_pax += $scope.reportData[i].total_amount;
        }
        // for(var i=0; i<$scope.reportData.length; i++){
        //   $scope.reportData[i].all_qty = all_qty+1;
        //   $scope.reportData[i].all_pax = all_pax.toFixed(2);
        // }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'sportcheck.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/sportcheck.js'), $scope.reportData);
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


router.post('/statistic_by_nation', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "SELECT c.code, c.nation_en, c.nation_th, sum(total_pax) cnt "
            + "FROM inform  i "
            + "left  JOIN country c ON i.nation = c.code "
            + "inner join period p on case when i.complete_by IS NULL then i.period_code = p.code  else i.complete_by = p.code end "
            + "WHERE p.p_date BETWEEN  '" + param.date_from +"'  AND  '" + param.date_to + "' "
            + "AND i.airport='" + param.airport + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.is_domestic = 'NO' "
            + "GROUP BY i.nation";


    // var sql = "select * from inform order by id desc  limit 50";
    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var total = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
          total += $scope.reportData[i].cnt;
          // all_qty = i;
          // all_pax += $scope.reportData[i].total_amount;
        }
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].total = total.toFixed(0);
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'statistic_by_nation.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/statistic_by_nation.js'), $scope.reportData);
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


router.post('/statistic_by_member', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "select i.mem_code, m.name_en, sum(total_pax) cnt "
            + "from inform i "
            + "inner join member m on i.mem_code = m.code "
            + "inner join period p on case when i.complete_by IS NULL then i.period_code = p.code  else i.complete_by = p.code end "
            + "where p.p_date between  '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.airport='" + param.airport + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.is_domestic = 'NO' "
            + "group by i.mem_code";


    // var sql = "select * from inform order by id desc  limit 50";
    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData);
        var total = 0;
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].no = i+1;
          $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
          total += $scope.reportData[i].cnt;
          // all_qty = i;
          // all_pax += $scope.reportData[i].total_amount;
        }
        for(var i=0; i<$scope.reportData.length; i++){
          $scope.reportData[i].total = total.toFixed(0);
        }
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'statistic_by_member.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/statistic_by_member.js'), $scope.reportData);
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


router.post('/statistic_by_nation_member', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "select c.code,c.name_en nation, i.mem_code, m.name_en mem_name, sum(total_pax) cnt "
            + "from inform i "
            + "join member m on i.mem_code = m.code "
            + "join country c on c.code = i.nation "
            + "join period p on (case when i.complete_by IS NULL then i.period_code = p.code  else i.complete_by = p.code end) "
            + "where p.p_date between  '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.airport='" + param.airport + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.is_domestic = 'NO' "
            + "group by c.code,i.mem_code";


    // var sql = "select * from inform order by id desc  limit 50";
    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        $scope.reportDatas = [];
        // console.log($scope.reportData);
        var flag = 'x';
        var group_total = 0;
        var total = 0;
        for(var i=0; i <= $scope.reportData.length; i++){
          // $scope.reportDatas[i].no = i+1;
          if (i == $scope.reportData.length){
            $scope.reportDatas.push({"code":"", "name":"", "cnt":group_total});
            group_total = 0;
            break;
          }

          if(flag == 'x'){
            group_total = 0;
            $scope.reportDatas.push({"code":$scope.reportData[i].code, "name":$scope.reportData[i].nation, "cnt":""});
            $scope.reportDatas.push({"code":$scope.reportData[i].mem_code, "name":$scope.reportData[i].mem_name, "cnt":$scope.reportData[i].cnt});
            group_total += $scope.reportData[i].cnt;
            total += $scope.reportData[i].cnt;
            flag = $scope.reportData[i].code;
          } else if (flag == $scope.reportData[i].code) {
            $scope.reportDatas.push({"code":$scope.reportData[i].mem_code, "name":$scope.reportData[i].mem_name, "cnt":$scope.reportData[i].cnt});
            group_total += $scope.reportData[i].cnt;
            total += $scope.reportData[i].cnt;
          } else if (flag != $scope.reportData[i].code) {
            $scope.reportDatas.push({"code":"", "name":"", "cnt":group_total});
            $scope.reportDatas.push({"code":$scope.reportData[i].code, "name":$scope.reportData[i].nation, "cnt":""});
            $scope.reportDatas.push({"code":$scope.reportData[i].mem_code, "name":$scope.reportData[i].mem_name, "cnt":$scope.reportData[i].cnt});
            group_total = 0;
            group_total += $scope.reportData[i].cnt;
            total += $scope.reportData[i].cnt;
            flag = $scope.reportData[i].code;
          } 
        
        }
        for(var i=0; i<$scope.reportDatas.length; i++){
          $scope.reportDatas[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
          $scope.reportDatas[i].total = total.toFixed(0);
        }
      }
      console.log("report2 = ", $scope.reportDatas);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'statistic_by_nation_member.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/statistic_by_nation_member.js'), $scope.reportDatas);
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




router.post('/statistic_by_member_nation', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "select c.code,c.name_en nation, i.mem_code, m.name_en mem_name, sum(total_pax) cnt "
            + "from inform i "
            + "join member m on i.mem_code = m.code "
            + "join country c on c.code = i.nation "
            + "inner join period p on case when i.complete_by IS NULL then i.period_code = p.code  else i.complete_by = p.code end "
            + "where p.p_date between  '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.airport='" + param.airport + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.is_domestic = 'NO' "
            + "group by i.mem_code,c.code";


    // var sql = "select * from inform order by id desc  limit 50";
    console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        $scope.reportDatas = [];
        // console.log($scope.reportData);
        var flag = 'x';
        var group_total = 0;
        var total = 0;
        for(var i=0; i <= $scope.reportData.length; i++){
          // $scope.reportDatas[i].no = i+1;
          if (i == $scope.reportData.length){
            $scope.reportDatas.push({"code":"", "name":"", "cnt":group_total});
            group_total = 0;
            break;
          }

          if(flag == 'x'){
            group_total = 0;
            $scope.reportDatas.push({"code":$scope.reportData[i].mem_code, "name":$scope.reportData[i].mem_name, "cnt":""});
            $scope.reportDatas.push({"code":$scope.reportData[i].code, "name":$scope.reportData[i].nation, "cnt":$scope.reportData[i].cnt});
            group_total += $scope.reportData[i].cnt;
            total += $scope.reportData[i].cnt;
            flag = $scope.reportData[i].mem_code;
          } else if (flag == $scope.reportData[i].mem_code) {
            $scope.reportDatas.push({"code":$scope.reportData[i].code, "name":$scope.reportData[i].nation, "cnt":$scope.reportData[i].cnt});
            group_total += $scope.reportData[i].cnt;
            total += $scope.reportData[i].cnt;
          } else if (flag != $scope.reportData[i].mem_code) {
            $scope.reportDatas.push({"code":"", "name":"", "cnt":group_total});
            $scope.reportDatas.push({"code":$scope.reportData[i].mem_code, "name":$scope.reportData[i].mem_name, "cnt":""});
            $scope.reportDatas.push({"code":$scope.reportData[i].code, "name":$scope.reportData[i].nation, "cnt":$scope.reportData[i].cnt});
            group_total = 0;
            group_total += $scope.reportData[i].cnt;
            total += $scope.reportData[i].cnt;
            flag = $scope.reportData[i].mem_code;
          } 
        
        }
        for(var i=0; i<$scope.reportDatas.length; i++){
          $scope.reportDatas[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
          $scope.reportDatas[i].total = total.toFixed(0);
        }
      }
      console.log("report2 = ", $scope.reportDatas);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = 'statistic_by_member_nation.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/statistic_by_member_nation.js'), $scope.reportDatas);
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



router.post('/statistic_by_month', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);

  if (param.report == 'statistic_by_month_nation'){
    var report_name = 'รายการสถิติแยกตามสัญชาติ';
  } else if (param.report == 'statistic_by_month_member') {
    var report_name = 'รายการสถิติแยกตามสมาชิก';
  } else if (param.report == 'statistic_by_month_nation_member') {
    var report_name = 'รายการสถิติแยกตามสัญชาติ/สมาชิก';
  } else if (param.report == 'statistic_by_month_member_nation'){
    var report_name = 'รายการสถิติแยกตามสมาชิก/สัญชาติ';
  }


  var getData = function() {
    if (param.report == 'statistic_by_month_nation'){
      var sql = "SELECT c.name_en,substr(p.p_date,1,7) month     "
              + ", if(concat(substr(p.p_date,1,7), '-01') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '01') THEN total_pax ELSE 0 END), 0)  as day1 "
              + ", if(concat(substr(p.p_date,1,7), '-02') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '02') THEN total_pax ELSE 0 END), 0)  as day2 "
              + ", if(concat(substr(p.p_date,1,7), '-03') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '03') THEN total_pax ELSE 0 END), 0)  as day3 "
              + ", if(concat(substr(p.p_date,1,7), '-04') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '04') THEN total_pax ELSE 0 END), 0)  as day4 "
              + ", if(concat(substr(p.p_date,1,7), '-05') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '05') THEN total_pax ELSE 0 END), 0)  as day5 "
              + ", if(concat(substr(p.p_date,1,7), '-06') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '06') THEN total_pax ELSE 0 END), 0)  as day6 "
              + ", if(concat(substr(p.p_date,1,7), '-07') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '07') THEN total_pax ELSE 0 END), 0)  as day7 "
              + ", if(concat(substr(p.p_date,1,7), '-08') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '08') THEN total_pax ELSE 0 END), 0)  as day8 "
              + ", if(concat(substr(p.p_date,1,7), '-09') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '09') THEN total_pax ELSE 0 END), 0)  as day9 "
              + ", if(concat(substr(p.p_date,1,7), '-10') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '10') THEN total_pax ELSE 0 END), 0)  as day10 "
              + ", if(concat(substr(p.p_date,1,7), '-11') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '11') THEN total_pax ELSE 0 END), 0)  as day11 "
              + ", if(concat(substr(p.p_date,1,7), '-12') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '12') THEN total_pax ELSE 0 END), 0)  as day12 "
              + ", if(concat(substr(p.p_date,1,7), '-13') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '13') THEN total_pax ELSE 0 END), 0)  as day13 "
              + ", if(concat(substr(p.p_date,1,7), '-14') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '14') THEN total_pax ELSE 0 END), 0)  as day14 "
              + ", if(concat(substr(p.p_date,1,7), '-15') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '15') THEN total_pax ELSE 0 END), 0)  as day15 "
              + ", if(concat(substr(p.p_date,1,7), '-16') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '16') THEN total_pax ELSE 0 END), 0)  as day16 "
              + ", if(concat(substr(p.p_date,1,7), '-17') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '17') THEN total_pax ELSE 0 END), 0)  as day17 "
              + ", if(concat(substr(p.p_date,1,7), '-18') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '18') THEN total_pax ELSE 0 END), 0)  as day18 "
              + ", if(concat(substr(p.p_date,1,7), '-19') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '19') THEN total_pax ELSE 0 END), 0)  as day19 "
              + ", if(concat(substr(p.p_date,1,7), '-20') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '20') THEN total_pax ELSE 0 END), 0)  as day20 "
              + ", if(concat(substr(p.p_date,1,7), '-21') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '21') THEN total_pax ELSE 0 END), 0)  as day21 "
              + ", if(concat(substr(p.p_date,1,7), '-22') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '22') THEN total_pax ELSE 0 END), 0)  as day22 "
              + ", if(concat(substr(p.p_date,1,7), '-23') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '23') THEN total_pax ELSE 0 END), 0)  as day23 "
              + ", if(concat(substr(p.p_date,1,7), '-24') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '24') THEN total_pax ELSE 0 END), 0)  as day24 "
              + ", if(concat(substr(p.p_date,1,7), '-25') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '25') THEN total_pax ELSE 0 END), 0)  as day25 "
              + ", if(concat(substr(p.p_date,1,7), '-26') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '26') THEN total_pax ELSE 0 END), 0)  as day26 "
              + ", if(concat(substr(p.p_date,1,7), '-27') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '27') THEN total_pax ELSE 0 END), 0)  as day27 "
              + ", if(concat(substr(p.p_date,1,7), '-28') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '28') THEN total_pax ELSE 0 END), 0)  as day28 "
              + ", if(concat(substr(p.p_date,1,7), '-29') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '29') THEN total_pax ELSE 0 END), 0)  as day29 "
              + ", if(concat(substr(p.p_date,1,7), '-30') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '30') THEN total_pax ELSE 0 END), 0)  as day30 "
              + ", if(concat(substr(p.p_date,1,7), '-31') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '31') THEN total_pax ELSE 0 END), 0)  as day31 "
        + "FROM inform i "
        + "inner join country c on i.nation = c.code "
        + "inner join period p on case when i.complete_by IS NULL then i.period_code = p.code  else i.complete_by = p.code end "
        + "where p.p_date between '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.airport='" + param.airport + "' "
            + "and i.is_domestic = 'NO' "
        + "GROUP  BY substr(p.p_date,1,7),c.code"
    } else if (param.report == 'statistic_by_month_member') {
      var sql = "SELECT m.name_en,substr(p.p_date,1,7) month    " 
              + ", if(concat(substr(p.p_date,1,7), '-01') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '01') THEN total_pax ELSE 0 END), 0)  as day1 "
              + ", if(concat(substr(p.p_date,1,7), '-02') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '02') THEN total_pax ELSE 0 END), 0)  as day2 "
              + ", if(concat(substr(p.p_date,1,7), '-03') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '03') THEN total_pax ELSE 0 END), 0)  as day3 "
              + ", if(concat(substr(p.p_date,1,7), '-04') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '04') THEN total_pax ELSE 0 END), 0)  as day4 "
              + ", if(concat(substr(p.p_date,1,7), '-05') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '05') THEN total_pax ELSE 0 END), 0)  as day5 "
              + ", if(concat(substr(p.p_date,1,7), '-06') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '06') THEN total_pax ELSE 0 END), 0)  as day6 "
              + ", if(concat(substr(p.p_date,1,7), '-07') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '07') THEN total_pax ELSE 0 END), 0)  as day7 "
              + ", if(concat(substr(p.p_date,1,7), '-08') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '08') THEN total_pax ELSE 0 END), 0)  as day8 "
              + ", if(concat(substr(p.p_date,1,7), '-09') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '09') THEN total_pax ELSE 0 END), 0)  as day9 "
              + ", if(concat(substr(p.p_date,1,7), '-10') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '10') THEN total_pax ELSE 0 END), 0)  as day10 "
              + ", if(concat(substr(p.p_date,1,7), '-11') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '11') THEN total_pax ELSE 0 END), 0)  as day11 "
              + ", if(concat(substr(p.p_date,1,7), '-12') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '12') THEN total_pax ELSE 0 END), 0)  as day12 "
              + ", if(concat(substr(p.p_date,1,7), '-13') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '13') THEN total_pax ELSE 0 END), 0)  as day13 "
              + ", if(concat(substr(p.p_date,1,7), '-14') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '14') THEN total_pax ELSE 0 END), 0)  as day14 "
              + ", if(concat(substr(p.p_date,1,7), '-15') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '15') THEN total_pax ELSE 0 END), 0)  as day15 "
              + ", if(concat(substr(p.p_date,1,7), '-16') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '16') THEN total_pax ELSE 0 END), 0)  as day16 "
              + ", if(concat(substr(p.p_date,1,7), '-17') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '17') THEN total_pax ELSE 0 END), 0)  as day17 "
              + ", if(concat(substr(p.p_date,1,7), '-18') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '18') THEN total_pax ELSE 0 END), 0)  as day18 "
              + ", if(concat(substr(p.p_date,1,7), '-19') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '19') THEN total_pax ELSE 0 END), 0)  as day19 "
              + ", if(concat(substr(p.p_date,1,7), '-20') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '20') THEN total_pax ELSE 0 END), 0)  as day20 "
              + ", if(concat(substr(p.p_date,1,7), '-21') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '21') THEN total_pax ELSE 0 END), 0)  as day21 "
              + ", if(concat(substr(p.p_date,1,7), '-22') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '22') THEN total_pax ELSE 0 END), 0)  as day22 "
              + ", if(concat(substr(p.p_date,1,7), '-23') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '23') THEN total_pax ELSE 0 END), 0)  as day23 "
              + ", if(concat(substr(p.p_date,1,7), '-24') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '24') THEN total_pax ELSE 0 END), 0)  as day24 "
              + ", if(concat(substr(p.p_date,1,7), '-25') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '25') THEN total_pax ELSE 0 END), 0)  as day25 "
              + ", if(concat(substr(p.p_date,1,7), '-26') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '26') THEN total_pax ELSE 0 END), 0)  as day26 "
              + ", if(concat(substr(p.p_date,1,7), '-27') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '27') THEN total_pax ELSE 0 END), 0)  as day27 "
              + ", if(concat(substr(p.p_date,1,7), '-28') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '28') THEN total_pax ELSE 0 END), 0)  as day28 "
              + ", if(concat(substr(p.p_date,1,7), '-29') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '29') THEN total_pax ELSE 0 END), 0)  as day29 "
              + ", if(concat(substr(p.p_date,1,7), '-30') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '30') THEN total_pax ELSE 0 END), 0)  as day30 "
              + ", if(concat(substr(p.p_date,1,7), '-31') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '31') THEN total_pax ELSE 0 END), 0)  as day31 "
        + "FROM inform i "
        + "inner join member m on i.mem_code = m.code "
        + "inner join period p on  i.period_code = p.code   "
        + "where p.p_date between '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.status in ('DONE','PAID')  "
              + "and i.airport='" + param.airport + "' "
            + "and i.is_domestic = 'NO' "
        + "GROUP  BY substr(p.p_date,1,7),i.mem_code"
    } else if (param.report == 'statistic_by_month_nation_member') {
      var sql = "select c.code,c.name_en nation, i.mem_code, m.name_en ,substr(p.p_date,1,7) month     "
              + ", if(concat(substr(p.p_date,1,7), '-01') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '01') THEN total_pax ELSE 0 END), 0)  as day1 "  
              + ", if(concat(substr(p.p_date,1,7), '-02') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '02') THEN total_pax ELSE 0 END), 0)  as day2 "      
              + ", if(concat(substr(p.p_date,1,7), '-03') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '03') THEN total_pax ELSE 0 END), 0)  as day3 "        
              + ", if(concat(substr(p.p_date,1,7), '-04') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '04') THEN total_pax ELSE 0 END), 0)  as day4 "        
              + ", if(concat(substr(p.p_date,1,7), '-05') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '05') THEN total_pax ELSE 0 END), 0)  as day5 " 
              + ", if(concat(substr(p.p_date,1,7), '-06') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '06') THEN total_pax ELSE 0 END), 0)  as day6 "      
              + ", if(concat(substr(p.p_date,1,7), '-07') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '07') THEN total_pax ELSE 0 END), 0)  as day7 "
              + ", if(concat(substr(p.p_date,1,7), '-08') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '08') THEN total_pax ELSE 0 END), 0)  as day8 "
              + ", if(concat(substr(p.p_date,1,7), '-09') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '09') THEN total_pax ELSE 0 END), 0)  as day9 "
              + ", if(concat(substr(p.p_date,1,7), '-10') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '10') THEN total_pax ELSE 0 END), 0)  as day10 "
              + ", if(concat(substr(p.p_date,1,7), '-11') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '11') THEN total_pax ELSE 0 END), 0)  as day11 "
              + ", if(concat(substr(p.p_date,1,7), '-12') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '12') THEN total_pax ELSE 0 END), 0)  as day12 "
              + ", if(concat(substr(p.p_date,1,7), '-13') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '13') THEN total_pax ELSE 0 END), 0)  as day13 "
              + ", if(concat(substr(p.p_date,1,7), '-14') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '14') THEN total_pax ELSE 0 END), 0)  as day14 "
              + ", if(concat(substr(p.p_date,1,7), '-15') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '15') THEN total_pax ELSE 0 END), 0)  as day15 "
              + ", if(concat(substr(p.p_date,1,7), '-16') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '16') THEN total_pax ELSE 0 END), 0)  as day16 "
              + ", if(concat(substr(p.p_date,1,7), '-17') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '17') THEN total_pax ELSE 0 END), 0)  as day17 "
              + ", if(concat(substr(p.p_date,1,7), '-18') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '18') THEN total_pax ELSE 0 END), 0)  as day18 "
              + ", if(concat(substr(p.p_date,1,7), '-19') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '19') THEN total_pax ELSE 0 END), 0)  as day19 "
              + ", if(concat(substr(p.p_date,1,7), '-20') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '20') THEN total_pax ELSE 0 END), 0)  as day20 "
              + ", if(concat(substr(p.p_date,1,7), '-21') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '21') THEN total_pax ELSE 0 END), 0)  as day21 "
              + ", if(concat(substr(p.p_date,1,7), '-22') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '22') THEN total_pax ELSE 0 END), 0)  as day22 "
              + ", if(concat(substr(p.p_date,1,7), '-23') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '23') THEN total_pax ELSE 0 END), 0)  as day23 "
              + ", if(concat(substr(p.p_date,1,7), '-24') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '24') THEN total_pax ELSE 0 END), 0)  as day24 "
              + ", if(concat(substr(p.p_date,1,7), '-25') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '25') THEN total_pax ELSE 0 END), 0)  as day25 "
              + ", if(concat(substr(p.p_date,1,7), '-26') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '26') THEN total_pax ELSE 0 END), 0)  as day26 "
              + ", if(concat(substr(p.p_date,1,7), '-27') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '27') THEN total_pax ELSE 0 END), 0)  as day27 "
              + ", if(concat(substr(p.p_date,1,7), '-28') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '28') THEN total_pax ELSE 0 END), 0)  as day28 "
              + ", if(concat(substr(p.p_date,1,7), '-29') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '29') THEN total_pax ELSE 0 END), 0)  as day29 "
              + ", if(concat(substr(p.p_date,1,7), '-30') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '30') THEN total_pax ELSE 0 END), 0)  as day30 "
              + ", if(concat(substr(p.p_date,1,7), '-31') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '31') THEN total_pax ELSE 0 END), 0)  as day31 "
        + "from inform i "
        + "join member m on i.mem_code = m.code "
        + "join country c on c.code = i.nation "
        + "join period p on i.complete_by = p.code "
        + "where p.p_date between  '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.airport='" + param.airport + "' "
            + "and i.status in ('DONE','PAID') "
          + "and i.is_domestic = 'NO' "
        + "group by c.code,i.mem_code "
        + "order by c.code,i.mem_code"
    } else if (param.report == 'statistic_by_month_member_nation'){
      var sql = "select c.code,c.name_en, i.mem_code, m.name_en mem_name,substr(p.p_date,1,7) month "
              + ", if(concat(substr(p.p_date,1,7), '-01') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '01') THEN total_pax ELSE 0 END), 0)  as day1 "
              + ", if(concat(substr(p.p_date,1,7), '-02') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '02') THEN total_pax ELSE 0 END), 0)  as day2 "
              + ", if(concat(substr(p.p_date,1,7), '-03') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '03') THEN total_pax ELSE 0 END), 0)  as day3 "
              + ", if(concat(substr(p.p_date,1,7), '-04') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '04') THEN total_pax ELSE 0 END), 0)  as day4 "
              + ", if(concat(substr(p.p_date,1,7), '-05') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '05') THEN total_pax ELSE 0 END), 0)  as day5 "
              + ", if(concat(substr(p.p_date,1,7), '-06') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '06') THEN total_pax ELSE 0 END), 0)  as day6 "
              + ", if(concat(substr(p.p_date,1,7), '-07') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '07') THEN total_pax ELSE 0 END), 0)  as day7 "
              + ", if(concat(substr(p.p_date,1,7), '-08') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '08') THEN total_pax ELSE 0 END), 0)  as day8 "
              + ", if(concat(substr(p.p_date,1,7), '-09') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '09') THEN total_pax ELSE 0 END), 0)  as day9 "
              + ", if(concat(substr(p.p_date,1,7), '-10') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '10') THEN total_pax ELSE 0 END), 0)  as day10 "
              + ", if(concat(substr(p.p_date,1,7), '-11') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '11') THEN total_pax ELSE 0 END), 0)  as day11 "
              + ", if(concat(substr(p.p_date,1,7), '-12') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '12') THEN total_pax ELSE 0 END), 0)  as day12 "
              + ", if(concat(substr(p.p_date,1,7), '-13') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '13') THEN total_pax ELSE 0 END), 0)  as day13 "
              + ", if(concat(substr(p.p_date,1,7), '-14') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '14') THEN total_pax ELSE 0 END), 0)  as day14 "
              + ", if(concat(substr(p.p_date,1,7), '-15') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '15') THEN total_pax ELSE 0 END), 0)  as day15 "
              + ", if(concat(substr(p.p_date,1,7), '-16') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '16') THEN total_pax ELSE 0 END), 0)  as day16 "
              + ", if(concat(substr(p.p_date,1,7), '-17') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '17') THEN total_pax ELSE 0 END), 0)  as day17 "
              + ", if(concat(substr(p.p_date,1,7), '-18') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '18') THEN total_pax ELSE 0 END), 0)  as day18 "
              + ", if(concat(substr(p.p_date,1,7), '-19') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '19') THEN total_pax ELSE 0 END), 0)  as day19 "
              + ", if(concat(substr(p.p_date,1,7), '-20') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '20') THEN total_pax ELSE 0 END), 0)  as day20 "
              + ", if(concat(substr(p.p_date,1,7), '-21') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '21') THEN total_pax ELSE 0 END), 0)  as day21 "
              + ", if(concat(substr(p.p_date,1,7), '-22') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '22') THEN total_pax ELSE 0 END), 0)  as day22 "
              + ", if(concat(substr(p.p_date,1,7), '-23') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '23') THEN total_pax ELSE 0 END), 0)  as day23 "
              + ", if(concat(substr(p.p_date,1,7), '-24') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '24') THEN total_pax ELSE 0 END), 0)  as day24 "
              + ", if(concat(substr(p.p_date,1,7), '-25') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '25') THEN total_pax ELSE 0 END), 0)  as day25 "
              + ", if(concat(substr(p.p_date,1,7), '-26') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '26') THEN total_pax ELSE 0 END), 0)  as day26 "
              + ", if(concat(substr(p.p_date,1,7), '-27') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '27') THEN total_pax ELSE 0 END), 0)  as day27 "
              + ", if(concat(substr(p.p_date,1,7), '-28') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '28') THEN total_pax ELSE 0 END), 0)  as day28 "
              + ", if(concat(substr(p.p_date,1,7), '-29') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '29') THEN total_pax ELSE 0 END), 0)  as day29 "
              + ", if(concat(substr(p.p_date,1,7), '-30') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '30') THEN total_pax ELSE 0 END), 0)  as day30 "
              + ", if(concat(substr(p.p_date,1,7), '-31') between  '" + param.date_from + "'  and  '" + param.date_to + "', sum(case when (substr(p.p_date,9,2) = '31') THEN total_pax ELSE 0 END), 0)  as day31 "
        + "from inform i "
        + "join member m on i.mem_code = m.code "
        + "join country c on c.code = i.nation "
        + "inner join period p on i.period_code = p.code "
        + "where p.p_date between  '" + param.date_from + "'  and  '" + param.date_to + "' "
            + "and i.airport='" + param.airport + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.is_domestic = 'NO'  "
        + "group by i.mem_code,c.code "
        + "order by i.mem_code,c.code"
    }

    // var sql = "select * from inform order by id desc  limit 50";
    // console.log(" sql = ", sql);

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        console.log($scope.reportData.length);

        var flag = 'x';
        var group_total = 0;
        var total = 0;
        var no = 0;

        if (param.report == 'statistic_by_month_nation' || param.report == 'statistic_by_month_member') {
          for(var i=0; i < $scope.reportData.length; i++){
            var sum = $scope.reportData[i].day1                   
                    + $scope.reportData[i].day2                   
                    + $scope.reportData[i].day3                   
                    + $scope.reportData[i].day4                   
                    + $scope.reportData[i].day5                   
                    + $scope.reportData[i].day6                   
                    + $scope.reportData[i].day7                   
                    + $scope.reportData[i].day8                   
                    + $scope.reportData[i].day9                   
                    + $scope.reportData[i].day10 
                    + $scope.reportData[i].day11 
                    + $scope.reportData[i].day12 
                    + $scope.reportData[i].day13 
                    + $scope.reportData[i].day14 
                    + $scope.reportData[i].day15 
                    + $scope.reportData[i].day16 
                    + $scope.reportData[i].day17 
                    + $scope.reportData[i].day18 
                    + $scope.reportData[i].day19 
                    + $scope.reportData[i].day20 
                    + $scope.reportData[i].day21 
                    + $scope.reportData[i].day22 
                    + $scope.reportData[i].day23 
                    + $scope.reportData[i].day24 
                    + $scope.reportData[i].day25 
                    + $scope.reportData[i].day26 
                    + $scope.reportData[i].day27 
                    + $scope.reportData[i].day28 
                    + $scope.reportData[i].day29 
                    + $scope.reportData[i].day30 
                    + $scope.reportData[i].day31 ;
            $scope.reportData[i].sum = sum;
            $scope.reportData[i].report_name = report_name;
            $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
            total += sum;
            $scope.reportData[i].no = i+1;
            $scope.reportData[i].line = true;

            var month = ($scope.reportData[i].month).substring(5,7);
            // console.log("month = ", month);
            $scope.reportData[i].months = (month == ("01") ? "มกราคม" : month == ("02") ? "กุมภาพันธ์" : month == ("03") ? "มีนาคม" : month == ("04") ? "เมษายน" : month == ("05") ? "พฤษภาคม" : month == ("06") ? "มิถุนายน" : month == ("07") ? "กรกฎาคม" : month == ("08") ? "สิงหาคม" : month == ("09") ? "กันยายน" : month == ("10") ? "ตุลาคม" : month == ("11") ? "พฤศจิกายน" : "ธันวาคม") + " " + ($scope.reportData[i].month).substring(0,4);
          }
          for(var i=0; i<$scope.reportData.length; i++){
            $scope.reportData[i].total = total.toFixed(0);
          }
        } else if (param.report == 'statistic_by_month_nation_member'){
          var data = $scope.reportData;
          $scope.reportData = [];

          for(var i=0; i < data.length; i++){
            var sum = data[i].day1                   
                    + data[i].day2                   
                    + data[i].day3                   
                    + data[i].day4                   
                    + data[i].day5                   
                    + data[i].day6                   
                    + data[i].day7                   
                    + data[i].day8                   
                    + data[i].day9                   
                    + data[i].day10 
                    + data[i].day11 
                    + data[i].day12 
                    + data[i].day13 
                    + data[i].day14 
                    + data[i].day15 
                    + data[i].day16 
                    + data[i].day17 
                    + data[i].day18 
                    + data[i].day19 
                    + data[i].day20 
                    + data[i].day21 
                    + data[i].day22 
                    + data[i].day23 
                    + data[i].day24 
                    + data[i].day25 
                    + data[i].day26 
                    + data[i].day27 
                    + data[i].day28 
                    + data[i].day29 
                    + data[i].day30 
                    + data[i].day31 ;
            data[i].sum = sum;
            data[i].report_name = report_name;
            total += sum;
            no += 1;
            data[i].no = no;
            data[i].line = true;
          }

          // for(var i=0; i<data.length; i++){
          //   data[i].total = total.toFixed(0);
          // }

          for(var i=0; i <= data.length; i++){
            // $scope.reportDatas[i].no = i+1;
            if (i == data.length){
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total, 
                                      "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                                      "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                                      "day30":"","day31":"", "month": param.date_from, "no": ""
                                    });
              group_total = 0;
              break;
            }

            if(flag == 'x'){
              group_total = 0;
              $scope.reportData.push({"name_en":data[i].code + ' : ' + data[i].nation, "line":false, "sum":"",
                "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                "day30":"","day31":"", "month": param.date_from, "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].code;
            } else if (flag == $scope.reportData[i].code) {
              $scope.reportData.push(data[i]);
              // console.log("my data = ");
              group_total += data[i].sum;
              total += data[i].sum;
            } else if (flag != data[i].code) {
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total,
                "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                "day30":"","day31":"", "month": param.date_from, "no": ""
              });
              $scope.reportData.push({"name_en":data[i].code + ' : ' + data[i].nation, "line":false, "sum":"",
                "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                "day30":"","day31":"", "month": param.date_from, "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total = 0;
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].code;
            } 
        
          }

          for(var i=0; i<$scope.reportData.length; i++){
            $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
            $scope.reportData[i].total = total.toFixed(0);
            $scope.reportData[i].report_name = report_name;
            console.log("ddddd = ", $scope.reportData[i].month);
            // if($scope.reportData[i].month){
            var month = ($scope.reportData[i].month).substring(5,7);
              // console.log("month = ", month);
            $scope.reportData[i].months = (month == ("01") ? "มกราคม" : month == ("02") ? "กุมภาพันธ์" : month == ("03") ? "มีนาคม" : month == ("04") ? "เมษายน" : month == ("05") ? "พฤษภาคม" : month == ("06") ? "มิถุนายน" : month == ("07") ? "กรกฎาคม" : month == ("08") ? "สิงหาคม" : month == ("09") ? "กันยายน" : month == ("10") ? "ตุลาคม" : month == ("11") ? "พฤศจิกายน" : "ธันวาคม") + " " + ($scope.reportData[i].month).substring(0,4);
            // }
          }

        } else if (param.report == 'statistic_by_month_member_nation') {
          var data = $scope.reportData;
          $scope.reportData = [];

          for(var i=0; i < data.length; i++){
            var sum = data[i].day1                   
                    + data[i].day2                   
                    + data[i].day3                   
                    + data[i].day4                   
                    + data[i].day5                   
                    + data[i].day6                   
                    + data[i].day7                   
                    + data[i].day8                   
                    + data[i].day9                   
                    + data[i].day10 
                    + data[i].day11 
                    + data[i].day12 
                    + data[i].day13 
                    + data[i].day14 
                    + data[i].day15 
                    + data[i].day16 
                    + data[i].day17 
                    + data[i].day18 
                    + data[i].day19 
                    + data[i].day20 
                    + data[i].day21 
                    + data[i].day22 
                    + data[i].day23 
                    + data[i].day24 
                    + data[i].day25 
                    + data[i].day26 
                    + data[i].day27 
                    + data[i].day28 
                    + data[i].day29 
                    + data[i].day30 
                    + data[i].day31 ;
            data[i].sum = sum;
            data[i].report_name = report_name;
            total += sum;
            no += 1;
            data[i].no = no;
            data[i].line = true;
          }

          // for(var i=0; i<data.length; i++){
          //   data[i].total = total.toFixed(0);
          // }

          for(var i=0; i <= data.length; i++){
            // $scope.reportDatas[i].no = i+1;
            if (i == data.length){
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total, 
                                      "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                                      "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                                      "day30":"","day31":"", "month": param.date_from, "no": ""
                                    });
              group_total = 0;
              break;
            }

            if(flag == 'x'){
              group_total = 0;
              $scope.reportData.push({"name_en":data[i].mem_code + ' : ' + data[i].mem_name, "line":false, "sum":"",
                "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                "day30":"","day31":"", "month": param.date_from, "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].mem_code;
            } else if (flag == $scope.reportData[i].mem_code) {
              $scope.reportData.push(data[i]);
              // console.log("my data = ");
              group_total += data[i].sum;
              total += data[i].sum;
            } else if (flag != data[i].mem_code) {
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total,
                "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                "day30":"","day31":"", "month": param.date_from, "no": ""
              });
              $scope.reportData.push({"name_en":data[i].mem_code + ' : ' + data[i].mem_name, "line":false, "sum":"",
                "day1":"","day2":"","day3":"","day4":"","day5":"","day6":"","day7":"","day8":"","day9":"","day10":"","day11":"","day12":"","day13":"","day14":"","day15":"",
                "day16":"","day17":"","day18":"","day19":"","day20":"","day21":"","day22":"","day23":"","day24":"","day25":"","day26":"","day27":"","day28":"","day29":"",
                "day30":"","day31":"", "month": param.date_from, "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total = 0;
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].mem_code;
            } 
        
          }

          for(var i=0; i<$scope.reportData.length; i++){
            $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " วันที่ " + param.date_from + " ถึง " + param.date_to;
            $scope.reportData[i].total = total.toFixed(0);
            $scope.reportData[i].report_name = report_name;
            console.log("ddddd = ", $scope.reportData[i].month);
            // if($scope.reportData[i].month){
            var month = ($scope.reportData[i].month).substring(5,7);
              // console.log("month = ", month);
            $scope.reportData[i].months = (month == ("01") ? "มกราคม" : month == ("02") ? "กุมภาพันธ์" : month == ("03") ? "มีนาคม" : month == ("04") ? "เมษายน" : month == ("05") ? "พฤษภาคม" : month == ("06") ? "มิถุนายน" : month == ("07") ? "กรกฎาคม" : month == ("08") ? "สิงหาคม" : month == ("09") ? "กันยายน" : month == ("10") ? "ตุลาคม" : month == ("11") ? "พฤศจิกายน" : "ธันวาคม") + " " + ($scope.reportData[i].month).substring(0,4);
            // }
          }
        }
        
      }
      console.log("report2 = ", $scope.reportData);
    });
  };

  var renderReport = function() {
    var dfd = q.defer();
    $scope.pdfFile = param.report + '.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/statistic_by_month_nation.js'), $scope.reportData);
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





router.post('/statistic_by_year', [bodyParser.json()], function(req, res) {
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);

  if(param.report == "statistic_by_year_nation") {
    var report_name = "รายการสถิติแยกตามสัญชาติ";
  } else if (param.report == "statistic_by_year_member") {
    var report_name = "รายการสถิติแยกตามสมาชิก";
  } else if (param.report == "statistic_by_year_nation_member") {
    var report_name = "รายการสถิติแยกตามสัญชาติ/สมาชิก";
  } else if (param.report == "statistic_by_year_member_nation") {
    var report_name = "รายการสถิติแยกตามสมาชิก/สัญชาติ";
  }

  var getData = function() {
    if (param.report == "statistic_by_year_nation"){
      var sql = "SELECT c.name_en "
              + ", sum(case when (substr(i.issue_date,6,2) = '01') THEN total_pax ELSE 0 END) AS 'jan' "
              + ", sum(case when (substr(i.issue_date,6,2) = '02') THEN total_pax ELSE 0 END) AS 'feb' "
              + ", sum(case when (substr(i.issue_date,6,2) = '03') THEN total_pax ELSE 0 END) AS 'mar' "
              + ", sum(case when (substr(i.issue_date,6,2) = '04') THEN total_pax ELSE 0 END) AS 'apr' "
              + ", sum(case when (substr(i.issue_date,6,2) = '05') THEN total_pax ELSE 0 END) AS 'may' "
              + ", sum(case when (substr(i.issue_date,6,2) = '06') THEN total_pax ELSE 0 END) AS 'jun' "
              + ", sum(case when (substr(i.issue_date,6,2) = '07') THEN total_pax ELSE 0 END) AS 'july' "
              + ", sum(case when (substr(i.issue_date,6,2) = '08') THEN total_pax ELSE 0 END) AS 'aug' "
              + ", sum(case when (substr(i.issue_date,6,2) = '09') THEN total_pax ELSE 0 END) AS 'sep' "
              + ", sum(case when (substr(i.issue_date,6,2) = '10') THEN total_pax ELSE 0 END) AS 'oct' "
              + ", sum(case when (substr(i.issue_date,6,2) = '11') THEN total_pax ELSE 0 END) AS 'nov' "
              + ", sum(case when (substr(i.issue_date,6,2) = '12') THEN total_pax ELSE 0 END) AS 'dec' "
          + "FROM inform i "
          + "left join country c on i.nation = c.code "
          + "where substr(i.issue_date,1,4) = '" + param.year + "' "
          + "and i.status in ('DONE','PAID') "
            + "and i.airport='" + param.airport + "' "
            + "and i.is_domestic = 'NO' "
          + "GROUP  BY c.code";
    } else if (param.report == "statistic_by_year_member") {
      var sql = "SELECT m.name_en "
              + ", sum(case when (substr(i.issue_date,6,2) = '01') THEN total_pax ELSE 0 END) AS 'jan' "
              + ", sum(case when (substr(i.issue_date,6,2) = '02') THEN total_pax ELSE 0 END) AS 'feb' "
              + ", sum(case when (substr(i.issue_date,6,2) = '03') THEN total_pax ELSE 0 END) AS 'mar' "
              + ", sum(case when (substr(i.issue_date,6,2) = '04') THEN total_pax ELSE 0 END) AS 'apr' "
              + ", sum(case when (substr(i.issue_date,6,2) = '05') THEN total_pax ELSE 0 END) AS 'may' "
              + ", sum(case when (substr(i.issue_date,6,2) = '06') THEN total_pax ELSE 0 END) AS 'jun' "
              + ", sum(case when (substr(i.issue_date,6,2) = '07') THEN total_pax ELSE 0 END) AS 'july' "
              + ", sum(case when (substr(i.issue_date,6,2) = '08') THEN total_pax ELSE 0 END) AS 'aug' "
              + ", sum(case when (substr(i.issue_date,6,2) = '09') THEN total_pax ELSE 0 END) AS 'sep' "
              + ", sum(case when (substr(i.issue_date,6,2) = '10') THEN total_pax ELSE 0 END) AS 'oct' "
              + ", sum(case when (substr(i.issue_date,6,2) = '11') THEN total_pax ELSE 0 END) AS 'nov' "
              + ", sum(case when (substr(i.issue_date,6,2) = '12') THEN total_pax ELSE 0 END) AS 'dec' "
          + "FROM inform i "
          + "left join member m on i.mem_code = m.code "
          + "where substr(i.issue_date,1,4) = '" + param.year + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.airport='" + param.airport + "' "
            + "and i.is_domestic = 'NO' "
          + "GROUP  BY mem_code";
    } else if (param.report == "statistic_by_year_nation_member") {
      var sql = "select c.code,c.name_en as c_name_en, m.code as mem_code, m.name_en as mem_name, concat(m.code , ' : ' , m.name_en) as name_en "
              + ", sum(case when (substr(p.p_date,6,2) = '01') THEN total_pax ELSE 0 END) AS 'jan' "
              + ", sum(case when (substr(p.p_date,6,2) = '02') THEN total_pax ELSE 0 END) AS 'feb' "
              + ", sum(case when (substr(p.p_date,6,2) = '03') THEN total_pax ELSE 0 END) AS 'mar' "
              + ", sum(case when (substr(p.p_date,6,2) = '04') THEN total_pax ELSE 0 END) AS 'apr' "
              + ", sum(case when (substr(p.p_date,6,2) = '05') THEN total_pax ELSE 0 END) AS 'may' "
              + ", sum(case when (substr(p.p_date,6,2) = '06') THEN total_pax ELSE 0 END) AS 'jun' "
              + ", sum(case when (substr(p.p_date,6,2) = '07') THEN total_pax ELSE 0 END) AS 'july' "
              + ", sum(case when (substr(p.p_date,6,2) = '08') THEN total_pax ELSE 0 END) AS 'aug' "
              + ", sum(case when (substr(p.p_date,6,2) = '09') THEN total_pax ELSE 0 END) AS 'sep' "
              + ", sum(case when (substr(p.p_date,6,2) = '10') THEN total_pax ELSE 0 END) AS 'oct' "
              + ", sum(case when (substr(p.p_date,6,2) = '11') THEN total_pax ELSE 0 END) AS 'nov' "
              + ", sum(case when (substr(p.p_date,6,2) = '12') THEN total_pax ELSE 0 END) AS 'dec' "
            + "from inform i "
            + "left join country c on c.code = i.nation "
            + "join member m on m.code = i.mem_code "
            + "join period p on i.complete_by = p.code "
            + "where substr(p.p_date,1,4) = '" + param.year + "' "
              + "and i.status in ('DONE','PAID') "
              + "and i.airport='" + param.airport + "' "
              + "and i.is_domestic = 'NO' "
            + "group by c.code,i.mem_code "
            + "order by c.code,i.mem_code";
    } else if (param.report == "statistic_by_year_member_nation") {
      var sql = "SELECT i.mem_code,m.name_en as m_name_en,i.nation as nation_code,c.name_en as nation_en, concat(i.nation, ' : ', c.name_en) as name_en "
              + ", sum(case when (substr(p.p_date,6,2) = '01') THEN total_pax ELSE 0 END) AS 'jan' "
              + ", sum(case when (substr(p.p_date,6,2) = '02') THEN total_pax ELSE 0 END) AS 'feb' "
              + ", sum(case when (substr(p.p_date,6,2) = '03') THEN total_pax ELSE 0 END) AS 'mar' "
              + ", sum(case when (substr(p.p_date,6,2) = '04') THEN total_pax ELSE 0 END) AS 'apr' "
              + ", sum(case when (substr(p.p_date,6,2) = '05') THEN total_pax ELSE 0 END) AS 'may' "
              + ", sum(case when (substr(p.p_date,6,2) = '06') THEN total_pax ELSE 0 END) AS 'jun' "
              + ", sum(case when (substr(p.p_date,6,2) = '07') THEN total_pax ELSE 0 END) AS 'july' "
              + ", sum(case when (substr(p.p_date,6,2) = '08') THEN total_pax ELSE 0 END) AS 'aug' "
              + ", sum(case when (substr(p.p_date,6,2) = '09') THEN total_pax ELSE 0 END) AS 'sep' "
              + ", sum(case when (substr(p.p_date,6,2) = '10') THEN total_pax ELSE 0 END) AS 'oct' "
              + ", sum(case when (substr(p.p_date,6,2) = '11') THEN total_pax ELSE 0 END) AS 'nov' "
              + ", sum(case when (substr(p.p_date,6,2) = '12') THEN total_pax ELSE 0 END) AS 'dec' "
          + "FROM inform i "
          + "left join member m on i.mem_code = m.code "
          + "join country c on c.code = i.nation "
          + "join period p on i.complete_by = p.code "
          + "where substr(p.p_date,1,4) = '" + param.year + "' "
            + "and i.status in ('DONE','PAID') "
            + "and i.airport='" + param.airport + "' "
            + "and i.is_domestic = 'NO' "
          + "GROUP BY i.mem_code,c.code "
          + "order BY i.mem_code,c.code";
    }

    return db.query(sql, param).then(function(rows) {
      if (rows.length > 0) {
        $scope.reportData = rows;
        var flag = 'x';
        var group_total = 0;
        var total = 0;
        var no = 0;

        if (param.report == 'statistic_by_year_nation' || param.report == 'statistic_by_year_member') {
          for(var i=0; i < $scope.reportData.length; i++){
            var sum = $scope.reportData[i].jan                   
                    + $scope.reportData[i].feb                   
                    + $scope.reportData[i].mar                   
                    + $scope.reportData[i].apr                   
                    + $scope.reportData[i].may                   
                    + $scope.reportData[i].jun                   
                    + $scope.reportData[i].july                   
                    + $scope.reportData[i].aug                   
                    + $scope.reportData[i].sep                   
                    + $scope.reportData[i].oct 
                    + $scope.reportData[i].nov 
                    + $scope.reportData[i].dec;
            $scope.reportData[i].sum = sum;
            $scope.reportData[i].report_name = report_name;
            $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " ปี " + param.year;
            total += sum;
            $scope.reportData[i].no = i+1;
            $scope.reportData[i].line = true;
          }
          for(var i=0; i<$scope.reportData.length; i++){
            $scope.reportData[i].total = total.toFixed(0);
          }
        } else if (param.report == "statistic_by_year_nation_member") {
          var data = $scope.reportData;
          $scope.reportData = [];
          for(var i=0; i < data.length; i++){
            var sum = data[i].jan                   
                    + data[i].feb                   
                    + data[i].mar                   
                    + data[i].apr                   
                    + data[i].may                   
                    + data[i].jun                   
                    + data[i].july                   
                    + data[i].aug                   
                    + data[i].sep                   
                    + data[i].oct 
                    + data[i].nov 
                    + data[i].dec;
            data[i].sum = sum;
            data[i].report_name = report_name;
            total += sum;
            no += 1;
            data[i].no = no;
            data[i].line = true;
          }

          for(var i=0; i <= data.length; i++){
            // $scope.reportDatas[i].no = i+1;
            if (i == data.length){
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total, 
                                      "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
                                    });
              group_total = 0;
              break;
            }

            if(flag == 'x'){
              group_total = 0;
              $scope.reportData.push({"name_en":data[i].code + ' : ' + data[i].c_name_en, "line":false, "sum":"",
                "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].code;
            } else if (flag == $scope.reportData[i].code) {
              $scope.reportData.push(data[i]);
              // console.log("my data = ");
              group_total += data[i].sum;
              total += data[i].sum;
            } else if (flag != data[i].code) {
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total,
                "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
              });
              $scope.reportData.push({"name_en":data[i].code + ' : ' + data[i].c_name_en, "line":false, "sum":"",
                "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total = 0;
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].code;
            } 
        
          }

          for(var i=0; i<$scope.reportData.length; i++){
            $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " ปี " + param.year;
            $scope.reportData[i].total = total.toFixed(0);
            $scope.reportData[i].report_name = report_name;
          }
          
        } else if (param.report == "statistic_by_year_member_nation") {
          var data = $scope.reportData;
          $scope.reportData = [];
          for(var i=0; i < data.length; i++){
            var sum = data[i].jan                   
                    + data[i].feb                   
                    + data[i].mar                   
                    + data[i].apr                   
                    + data[i].may                   
                    + data[i].jun                   
                    + data[i].july                   
                    + data[i].aug                   
                    + data[i].sep                   
                    + data[i].oct 
                    + data[i].nov 
                    + data[i].dec;
            data[i].sum = sum;
            data[i].report_name = report_name;
            total += sum;
            no += 1;
            data[i].no = no;
            data[i].line = true;
          }

          for(var i=0; i <= data.length; i++){
            // $scope.reportDatas[i].no = i+1;
            if (i == data.length){
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total, 
                                      "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
                                    });
              group_total = 0;
              break;
            }

            if(flag == 'x'){
              group_total = 0;
              $scope.reportData.push({"name_en":data[i].mem_code + ' : ' + data[i].m_name_en, "line":false, "sum":"",
                "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].mem_code;
            } else if (flag == $scope.reportData[i].mem_code) {
              $scope.reportData.push(data[i]);
              // console.log("my data = ");
              group_total += data[i].sum;
              total += data[i].sum;
            } else if (flag != data[i].mem_code) {
              $scope.reportData.push({"name_en":"", "line":false, "sum":group_total,
                "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
              });
              $scope.reportData.push({"name_en":data[i].mem_code + ' : ' + data[i].m_name_en, "line":false, "sum":"",
                "jan":"","feb":"","mar":"","apr":"","may":"","jun":"","july":"","aug":"","sep":"","oct":"","nov":"","dec":"", "no": ""
              });
              $scope.reportData.push(data[i]);
              group_total = 0;
              group_total += data[i].sum;
              total += data[i].sum;
              flag = data[i].mem_code;
            } 
        
          }

          for(var i=0; i<$scope.reportData.length; i++){
            $scope.reportData[i].airport = "สนามบิน " + (param.airport == "DMK" ? "ดอนเมือง" : "สุวรรณภูมิ") + " ปี " + param.year;
            $scope.reportData[i].total = total.toFixed(0);
            $scope.reportData[i].report_name = report_name;
          }
        }
        console.log("data = ", $scope.reportData);
      }
    });


  }

  var renderReport =function() {
    var dfd = q.defer();
    $scope.pdfFile = param.report + '.pdf';
    // var pdfFullPath = path.normalize(__dirname + '/../../../public/output/pickup/' + $scope.pdfFile);
    var pdfFullPath = path.normalize('./public/report/' + $scope.pdfFile);
    var report  = new nsReport();
    var doc = report.createDocument(require('./report/statistic_by_year.js'), $scope.reportData);
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