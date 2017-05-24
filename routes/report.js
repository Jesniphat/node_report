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
            + "ini.prod_code, pd.name prod_name, inv.issue_date, CONCAT(ini.prod_code | ':' | pd.name) as codename "
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
            + "CONCAT('วันที่: ' | '" + param.date_from + "' | ' ถึง ' | '" + param.date_to + "') as headdate, "
            + "CONCAT('" + param.mem_from + "' | '" + param.mem_to + "') as headcode, " 
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
            + "CONCAT('วันที่: ' | '" + param.date_from + "' | ' ถึง ' | '" + param.date_to + "') as headdate, "
            + "CONCAT('" + param.mem_from + "' | '" + param.mem_to + "') as headcode, " 
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


router.post('/sportcheck', [bodyParser.json()], function(req, res) {
  // console.log("test");
  var db = con.connect();
  var param = req.body;
  var $scope = {};
  console.log("req.body = ", req.body);


  var getData = function() {
    var sql = "SELECT group_concat(DISTINCT i.code ORDER BY i.code SEPARATOR ',') code "
            +  "   ,group_concat(DISTINCT i.ref_code ORDER BY i.ref_code SEPARATOR ',') ref_code "
            +  "    , i.mem_code, concat(m.name_th, ' - ', i.group_name) mem_name, i.is_domestic, i.flight "
            +  "    , group_concat(b.license ORDER BY b.license separator ', ') license_list "
            +  "    , max(i.total_pax) total_pax, max(b.done_time) last_time "
            +  "    , i.check_status, max(i.check_pax) check_pax, max(i.check_pax_child) check_pax_child "
            +  "    , max(i.check_pax_leader) check_pax_leader "
            +  "    , max(i.check_pax)+max(i.check_pax_child)+max(i.check_pax_leader) total, i.check_by, CONCAT('วันที่: ' | '" + param.date_from + "' | ' ถึง ' | '" + param.date_to + "') as datehead "
            +  "FROM inform i INNER JOIN buscall b ON i.code=b.inform_code "
            +  "  INNER JOIN member m ON i.mem_code=m.code "
            +  "WHERE b.airport= '" + param.airport + "' AND b.status='DONE' "
            +  "  AND (i.issue_date between '" + param.date_from + "' AND '" + param.date_to + "') "
            +  "  AND (CASE WHEN '" + param.period + "' = 'ALL' THEN i.period_code = i.period_code ELSE i.period_code LIKE '" + param.period + "' END) "
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


module.exports = router;