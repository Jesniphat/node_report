var pdfkit  = require('pdfkit');
var fs      = require('fs');
var path    = require('path');
var sizes   = require('./standardPageSizes');
var thai    = require('./thai');
var barcode = require('./barcode');

var fontNormal  = path.normalize(__dirname + '/../fonts/THSarabun.ttf');
var fontBold    = path.normalize(__dirname + '/../fonts/THSarabunBold.ttf');

pdfkit.prototype.angle = function(x, y, radius, angle){
  return { X: (x + radius * Math.cos(angle - Math.PI / 2)), Y: (y + radius * Math.sin(angle - Math.PI / 2)) };
}

pdfkit.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
    var s = this.angle(x, y, radius, startAngle);  //x + radius * Math.cos(startAngle - startCircle), sY = y + radius * Math.sin(startAngle - startCircle);
    var e = this.angle(x, y, radius, endAngle);
    var arcAngle = endAngle-startAngle, largeArc = (arcAngle > Math.PI) ^ (startAngle > endAngle) ^ anticlockwise;
    return this.moveTo(e.X, e.Y).lineTo(x, y).lineTo(s.X, s.Y)
    .path("M "+s.X+","+s.Y+" A "+radius+","+radius+" 0 "+(largeArc?"1":"0")+","+(anticlockwise?"0":"1")+" "+e.X+","+e.Y);
};

var NSReport = function() {

}

NSReport.prototype.createDocument = function(reportDefinition, data) {
  // console.log("reportDefinition = ", reportDefinition);
  var pageFooter = reportDefinition.pageFooter || false;
  var pageView = reportDefinition.pageView || 'table';
  var pageSize = pageSize2widthAndHeight(reportDefinition.pageSize || 'a4');
  reportDefinition.pageOrientation = reportDefinition.pageOrientation || 'portrait';
  if (reportDefinition.pageOrientation.toLowerCase() === 'landscape') {
    pageSize = { width: pageSize.height, height: pageSize.width};
    pageSize.orientation = 'landscape';
    //pageSize.height -= 10;
  } else {
    pageSize.orientation = 'portrait';
    //pageSize.height += 65;
  }
  this.imagePath = reportDefinition.imagePath || __dirname + '/../public';

  this.pdfKitDoc = new pdfkit({
      size: [pageSize.width, pageSize.height],
      compress: true,
      bufferPages: false,
      margin: 72
    }, {
      Producer: 'NSReport',
      Creator: 'NSReport',
      Title: 'NSReport',
      Author: 'NSReport',
      Subject: 'NSReport',
      Keywords: 'NSReport'
    });

  this.pdfKitDoc.registerFont('THSarabunNew1', fontNormal, 'TH Sarabun New');
  this.pdfKitDoc.registerFont('THSarabunNew1-Bold', fontBold, 'TH Sarabun New Bold');

  this.x = reportDefinition.margin[3];
  this.y = reportDefinition.margin[0];
  this.offsetX = this.x;
  this.offsetY = this.y;
  this.fontCount = [0,0];
  this.numFont = [1,1];
  this.data = data;
  this.isDebug = !!reportDefinition.debug;

  for (var i = 0; i < reportDefinition.RH.length; i++) {
    this.renderSection(reportDefinition.RH[i], data[0]);
    if (reportDefinition.RH[i].pageBreakAfter===true) {
      this.pdfKitDoc.addPage(this.pdfKitDoc.option);
      this.offsetX = this.x;
      this.offsetY = this.y;
    }
  };

  var printHeader = true;
  var row = 0;
  var totalRows = data.length;
 // console.log('data=', data);
  var pageHeight = pageSize.height -  reportDefinition.margin[0]/*top*/ -  reportDefinition.margin[2] /*bottom*/;
  // console.log('contentHeight=', contentHeight);
  var mRight = reportDefinition.margin[1] + reportDefinition.margin[3];

  var ItemFoot = [
    { type: 'text', align: 'left', fontSize: 10, bold:true, w: pageSize.width - mRight, h: 1, x: 0, y: 5, text: '{{display_name}} {{print_date}}', },
    { type: 'text', align: 'right', fontSize: 10, bold:true, w: pageSize.width - mRight, h: 1, x: 0, y: 5, field: 'page', },
  ]
  var DataFoot= {
    display_name: reportDefinition.display_name,
    print_date: reportDefinition.print_date
  }

  var page = 1;
  var flag_group = false;
  var page_end = false;
  var group_row = 0;
  // console.log('addPage', page, flag_group, !page_end);
  while (row < totalRows) {
    this.rowNum = row;

    // console.log(row, 'page', flag_group, !page_end);
    if(printHeader && group_row != 0 || page_end) {
      this.pdfKitDoc.addPage(this.pdfKitDoc.option);
      this.offsetX = this.x;
      this.offsetY = this.y;
      page++;
      // console.log('addPage::above', page, row);
    }
    page_end = false;
    if (printHeader===true) {

      var contentHeight = pageHeight;
      var numRow = 0; // number of record on page

      reportDefinition.GH = reportDefinition.GH || [];
      reportDefinition.GF = reportDefinition.GF || [];
      // console.log("reportDefinition = ", reportDefinition);
      for (var i = 0; i < reportDefinition.PH.length; i++) {
        // console.log("reportDefinition.PH[i] = ", reportDefinition.PH[i], " frt = ", data[row], "sdfsd = ", contentHeight);
        var height = this.renderSection(reportDefinition.PH[i], data[row], contentHeight);
        // console.log('measureSection.PH::', height);
        if (height===-1) throw 'renderSection:: reportDefinition.PH';
        contentHeight -= height;
      }

      for (var i = 0; i < reportDefinition.GH.length; i++) {
        var height = this.renderSection(reportDefinition.GH[i], data[row], contentHeight);
        if (height===-1) throw 'renderSection:: reportDefinition.GH';
        contentHeight -= height;
        // console.log('measureSection.GH::', height, row);
      }

      for (var i = 0; i < reportDefinition.PF.length; i++) {
        var height = this.measureSection(reportDefinition.PF[i], data[row], contentHeight);
        if (height===-1) throw 'measureSection:: reportDefinition.PF';
        // console.log('measureSection.PF::', height, row);
        contentHeight -= height;
      }

      for (var i = 0; i < reportDefinition.GF.length; i++) {
        var height = this.measureSection(reportDefinition.GF[i], data[row], contentHeight);
        if (height===-1) throw 'measureSection:: reportDefinition.GF';
        // console.log('measureSection.GF::', height, row);
        contentHeight -= height;
      }
      printHeader = false;
    }

    var height = 0;
    var group_data = 0;
    for (var i = 0; i < reportDefinition.DT.length; i++) {
      if (data[row].group_row != undefined) {
        if(group_row >= data[row].group_row)
        {
          flag_group = true;
          group_row = group_data;
        } else {
          flag_group = false;
          group_data = data[row].group_row;
        }
      }
      console.log('page', page, 'row', row, contentHeight, flag_group, group_row);
      if(!flag_group) {
        var height2 = this.renderSection(reportDefinition.DT[i], data[row], contentHeight);
        if (height2 != -1) height+=height2;
        // console.log('renderSection.DT::', height, row);
      }
    }
    //console.log(row, 'page', printHeader, contentHeight, flag_group, group_row, height);

    if (height === 0) {
      if (numRow==0) {
        console.log('ERROR3');
        throw 'ERROR3';
      }

      printHeader = true;
      for (var i = 0; i < reportDefinition.PF.length; i++) {
        var height2 = this.renderSection(reportDefinition.PF[i], data[row], 0);
        if (height2===-1) throw 'renderSection:: reportDefinition.PF';
        contentHeight -= height2;
        // console.log('renderSection.PF::', height2, row);
      }

      if(flag_group) {
        for (var i = 0; i < reportDefinition.GF.length; i++) {
          var height2 = this.renderSection(reportDefinition.GF[i], data[row-1], 0);
          if (height2===-1) throw 'renderSection:: reportDefinition.GF';
          //contentHeight -= height2;
          // console.log('renderSection.GF::', height2, row);
        }
      }

      if(pageFooter){
        for (var i = 0; i < ItemFoot.length; i++) { ItemFoot[i].y = (contentHeight > 0 ? contentHeight : ItemFoot[i].y); };
        DataFoot.page = 'หน้า '+page;
        var height2 = this.renderSection({ items: ItemFoot }, DataFoot, 0);
        if (height2===-1) throw 'renderSection:: reportDefinition.PF';
        contentHeight -= height2;
        // console.log('pageFooter.PF::', contentHeight, row);
      }

      page_end = true;
      continue;
    }
    group_row = group_data;
    contentHeight -= height;
    numRow++;
    row++;
  }

  for (var i = 0; i < reportDefinition.PF.length; i++) {
    var height2 = this.renderSection(reportDefinition.PF[i], data[row-1], 0);
    if (height2===-1) throw 'renderSection:: reportDefinition.PF';
    contentHeight -= height2;
    // console.log('renderSection.PF::', height, row);
  }

  for (var i = 0; i < reportDefinition.GF.length; i++) {
    var height = this.renderSection(reportDefinition.GF[i], data[row-1], 0);
    if (height===-1) throw 'renderSection:: reportDefinition.GF';
    //contentHeight -= height;
    // console.log('renderSection.GF::', height, row);
  }

  for (var i = 0; i < reportDefinition.RF.length; i++) {
    var height2 = this.renderSection(reportDefinition.RF[i], data[row-1], 0);
    if (height2===-1) throw 'renderSection:: reportDefinition.GF';
    contentHeight -= height2;
    // console.log('renderSection.RF::', height, row);
  }

  if(pageFooter){
    for (var i = 0; i < ItemFoot.length; i++) { ItemFoot[i].y = (contentHeight > 0 ? contentHeight : ItemFoot[i].y); };
    DataFoot.page = 'หน้า '+page;
    var height2 = this.renderSection({ items: ItemFoot }, DataFoot, 0);
    if (height2===-1) throw 'renderSection:: reportDefinition.PF';
    contentHeight -= height2;
    // console.log('pageFooter.PF::', contentHeight, row);
  }


  return this.pdfKitDoc;
}

var th = function(s) {
  return s.replace(/([\u0e48\u0e49\u0e4a\u0e4b])\u0e33/g, '\u0e4d$1\u0e32')
}
////////////////////////////////////////
// private function
////////////////////////////////////////

NSReport.prototype.measureSection = function (section, row) {
  var maxHeight = 0;
  var printState = this;
  //console.log('jack');
  if (section.overlay===true) {
    return 0;
  }
  section.items.forEach(function(item) {
    if (typeof item.show == 'function') {
      if (!item.show(row, printState)) {
        return;
      }
    }
    if (item.type == 'text' || item.type == 'money' || item.type == 'number') {
      maxHeight = Math.max(maxHeight, item.y+(item.h||10));
    } else if (item.type == 'image') {
      maxHeight = Math.max(maxHeight, item.y+item.fit[1]);
    } else if (item.type == 'line') {
      maxHeight = Math.max(maxHeight, item.y2);
    } else if (item.type == 'rectangle' || item.type=='barcode') {
      maxHeight = Math.max(maxHeight, item.y+item.h);
    } else if (item.type == 'hline') {
      maxHeight = maxHeight;
    } else if (item.type == 'vline') {
      maxHeight = Math.max(maxHeight, item.y+item.h);
    }
  });
  return maxHeight;
}

NSReport.prototype.renderSection = function (section, row, limit) {
  var printState = this;
  var doc = this.pdfKitDoc;
  var x = this.offsetX;
  var y = this.offsetY;
  var maxHeight = this.measureSection(section, row);
  
  if (limit > 0 && maxHeight > limit) {
//    console.log('**************', maxHeight, limit);
    return -1;
  }

  section.items.forEach(function(item, i) {
    console.log("item = ", item);
    console.log("i = ", i);
    if (this.isDebug) {
      if (item.type=='text' || item.type=='money' || item.type == 'number' || item.type=='image' || item.type=='circle' || item.type=='rectangle') {
        doc.lineWidth(0.5);
        var dim = {
          x:item.x,
          y:item.y,
          w:item.w,
          h:item.h
        };
        if (item.type=='image') {
          dim.w = dim.h = item.fit;
        }
        doc.undash();
        doc.rect(x + dim.x, y + dim.y, dim.w, dim.h);
        doc.stroke();
      }
    }
    if (typeof item.show == 'function') {
      if (!item.show(row, printState)) {
        return;
      }
    }
    if (item.color) {
      doc.fillColor(item.color);
    } else {
      doc.fillColor('#000');
    }
    if (item.type == 'text' || item.type=='money' || item.type == 'number') {
    //  maxHeight = Math.max(maxHeight, item.y+(item.h||10));
      doc.fontSize(item.fontSize);
      var opt = {width:item.w, height:item.h, lineBreak:false, ellipsis: true};
      if (typeof item.lineHeight === 'number') {
        delete opt.lineBreak;
        delete opt.ellipsis;
        opt.lineGap = item.fontSize*item.lineHeight - item.fontSize;
      }
      if (typeof item.align === 'string') {
        opt.align = item.align;
      }

      var text = '';
      if (typeof item.field === 'string') {
        if(typeof row[item.field] === 'number' && item.type == 'money') {
          text = ''+ (row[item.field] == undefined ? '-' : NumbertoMoney(row[item.field], 2).toString());
        } else if(typeof row[item.field] === 'number' && item.type == 'number') {
          text = ''+ (row[item.field] == undefined ? '-' : NumbertoMoney(row[item.field], 0).toString());
        } else {
          text = ''+row[item.field] || '';
        }

      } else if (typeof item.field === 'function') {
        text = item.field(row, this.rowNum, this.data) || '';
      } else {
        var itemText = th(item.text);
        var field = /\{\{(.*?)\}\}/ig.exec(itemText);
        while(field != null) {
          itemText = itemText.replace(field[0], row[field[1]]);
          field = /\{\{(.*?)\}\}/ig.exec(itemText);
        }
        text = ''+itemText || '';
      }
      
      var text = thai(text);
      // if (this.usedGlyphs.cnt > 100) {
      //   console.log(this.usedGlyphs.cnt);
      //   console.log('load more font');
      //   this.numFont++;
      //   this.usedGlyphs.cnt = 0;
      //   this.pdfKitDoc.registerFont('THSarabunNew'+this.numFont, './fonts/THSarabun.ttf', 'TH Sarabun New');
      //   this.pdfKitDoc.registerFont('THSarabunNew'+this.numFont+'-Bold', './fonts/THSarabunBold.ttf', 'TH Sarabun New Bold');
      // } else {
      //   console.log(this.usedGlyphs.cnt, this.numFont);
      // }
      if (!!item.bold) {
//         this.fontCount[1]++;
//         if (this.fontCount[1] > 20) {
//           this.numFont[1]++;
//           this.fontCount[1] = 0;
// //          console.log('numFont[1]=', this.numFont[1]);
//         }
        this.pdfKitDoc.registerFont('THSarabunNew-Bold', fontBold, 'TH Sarabun New Bold');
        doc.font('./fonts/THSarabunNewBold.ttf');
      } else {
//         this.fontCount[0]++;
//         if (this.fontCount[0] > 10) {
//           this.numFont[0]++;
//           this.fontCount[0] = 0;
// //          console.log('numFont[0]=', this.numFont[0]);
//         }
        this.pdfKitDoc.registerFont('THSarabunNew', fontNormal, 'TH Sarabun New');
        // console.log('what the font ' , this.numFont[0]);
        doc.font('./fonts/THSarabunNew.ttf');
      }
      doc.text(text, x+item.x, y+item.y, opt);
    } 
    else if (item.type == 'svg') {
       switch(item.name){
          case 'siamchai':
            var p1='M43.4,267.8H49c5.5,0,5.6,0,5.6,3v3h11.1h11.1v3.5v3.5H60.1H43.4v-6.6V267.8z';
            var p2='M-126.8,286h6.1h6.1v31.9v31.9h-6.1h-6.1v-14.2v-14.2l-2.5,1.6c-1.4'+
            ',0.9-5.2,2.3-8.2,3c-6.9,1.5-10.3,3.7-11.1,7c-1.5,6.2,2,9.6,9.8,9.6c3.9,0,4'+
            ',0.1,3.7,3.2c-0.3,3.2-0.5,3.3-5.1,3.6c-6.5,0.4-12.3-1.3-16.3-4.9c-3.1-2.7-3'+
            '.2-3.2-3.2-10.4c0-6.2,0.4-8.2,2.1-10.5c2.9-3.8,9.8-7.2,17.5-8.5c3.5-0.5,7.3'+
            '-1.4,8.3-1.9c5.5-3,6.5-7.4,2.3-11.2c-2.2-2.1-3.5-2.4-9.8-2.4c-7.5,0.1-13.8,'+
            '2.3-16.8,6c-0.8,0.9-1.7,1.6-2.1,1.6c-1.3,0,1-8.4,2.7-10.4c2.9-3.1,11.9-5.1,'+
            '20.8-4.5l7.9,0.6v-3.4V286z';
            var p3='M-84.1,292.7c0.4,0.3,0.8,2.3,0.8,4.7c0,3.1-0.3,3.9-1.4,3.5c-0.8-0'+
            '.3-3.1-0.9-5.1-1.3c-7.3-1.3-11.8,5.6-6.3,9.2c2.8,1.9,12.3,3.1,16.2,2.1c2.6-0'+
            '.6,2.6-0.8,2.6-10.2v-9.6h6.6h6.6v25.2v25.2l-3,2.5c-4.7,3.9-9.7,5.3-20.2,5.3c'+
            '-8.4,0-10.3-0.3-14.7-2.6c-6.7-3.3-9.6-7.8-9.6-14.3c0-8.8,2.7-12.5,11.6-15.5'+
            'c1.7-0.6,1.4-0.9-2-2.1c-6-2.1-8.6-5.6-8.6-11.4c0-5.8,2.6-9.7,7.4-11.2C-100'+
            '.1,291.2-85.8,291.6-84.1,292.7z M-77.2,318.4h-5.3c-8,0-14.1,4.4-15.5,10.9c-'+
            '0.9,4.5,1,9,4.7,10.8c3.4,1.8,9.9,1.9,13.6,0.3c2.4-1.1,2.5-1.4,2.5-11.6V318.4z';
            var p4='M-21.5,291.1h6.6h6.6v21.2c0,19.8,0.1,21.3,2.1,23.8c5.8,7.3,16.6,7.5,'+
            '19.1,0.3c0.6-1.7,1-12,1-24.1v-21.2H19H24v23.5c0,20.4-0.2,24.1-1.8,27.1c-4,'+
            '8.1-17.6,10.5-26.4,4.8l-4.2-2.7v3v3h-6.6h-6.6v-29.4V291.1z';
            var p5='M28.1,291.1h6.6h6.6V317v26l5.2-0.5c8.3-0.8,13.5-6.1,14.7-15.1c1.3-9'+
            '.7-3.8-18.3-12.8-21.4c-2.2-0.7-4.2-1.7-4.3-2.2c-0.1-0.6,2.8-3.6,6.5-6.9l6.7'+
            '-6l7.3,0.3l7.3,0.3l-6.7,5.1c-3.6,2.7-6.7,5.3-6.7,5.7s1.3,1.2,2.9,1.9c7,2.8'+
            ',10.2,9.6,10.2,21.2c0,10.9-3.3,17.5-10.6,21.4c-4.6,2.2-6.4,2.5-18.9,2.8l-'+
            '14,0.4v-29.5V291.1z';
            var p6='M101.2,292.7c0.4,0.3,0.8,2.3,0.8,4.7c0,3.1-0.3,3.9-1.4,3.5c-0.8-0'+
            '.3-3.1-0.9-5.1-1.3c-7.3-1.3-11.8,5.6-6.3,9.2c2.8,1.9,12.3,3.1,16.2,2.1c2'+
            '.6-0.6,2.6-0.8,2.6-10.2v-9.6h6.6h6.6v25.2v25.2l-3,2.5c-4.7,3.9-9.7,5.3-20'+
            '.2,5.3c-8.4,0-10.3-0.3-14.7-2.6c-6.7-3.3-9.6-7.8-9.6-14.3c0-8.8,2.7-12.5,'+
            '11.6-15.5c1.7-0.6,1.4-0.9-2-2.1c-6-2.1-8.6-5.6-8.6-11.4c0-5.8,2.6-9.7,7.4-11'+
            '.2C85.1,291.2,99.5,291.6,101.2,292.7z M108.1,318.4h-5.3c-8,0-14.1,4.4-15.5,'+
            '10.9c-0.9,4.5,1,9,4.7,10.8c3.4,1.8,9.9,1.9,13.6,0.3c2.4-1.1,2.5-1.4,2.5-11'+
            '.6V318.4z';
            var p7='M-34.1,294.7c7.8,3.8,8,4.7,8.3,31.4l0.3,23.7H-32h-6.7v-24.1c0-28.9,'+
            '0.4-28-11.6-28c-4.8,0-7.9,0.5-9,1.4c-2.1,1.8-2.6,1.3-1.9-2.2c0.4-1.9,1.4-3'+
            ',3.7-3.7C-52.6,291.6-38.4,292.6-34.1,294.7z';

            doc.save().translate(80, -100).scale(0.4) //.translate(item.x, item.y)
              .path(p1).path(p2).path(p3).path(p4).path(p5).path(p6).path(p7)
              .fill('red').restore();;
            break;
       }
    } else if (item.type == 'image') {
      //  maxHeight = Math.max(maxHeight, item.y+item.fit[1]);

       var _image = item.image;
       if (typeof item.field === 'function') {
         _image = item.field(row, this.rowNum, this.data) || '';
       }

       doc.image(path.normalize(this.imagePath + '/' + _image), x+item.x, y+item.y, {fit: item.fit});
    } else if (item.type == 'line') {
  //    maxHeight = Math.max(maxHeight, item.y2);
      if (item.style=='dotted') {
        doc.dash(1, {space: 2});
      } else if (item.style=='dashed') {
        doc.dash(3, {space: 3});
      } else {
        doc.undash();
      }
      if (typeof item.field === 'function') {
        console.log("jes row = ", row);
        if(row.GF == '1'){
          doc.lineWidth(item.lineWidth || 1);
          doc.moveTo(x+item.x1, y+item.y1);
          doc.lineTo(x+item.x2, y+item.y2);
          doc.stroke();
        }else{
          doc.lineWidth(0);
          doc.moveTo(0,0);
          doc.lineTo(0,0);
          doc.stroke();
        }
      }else{
        doc.lineWidth(item.lineWidth || 1);
        doc.moveTo(x+item.x1, y+item.y1);
        doc.lineTo(x+item.x2, y+item.y2);
        doc.stroke();
      }
      
    } else if (item.type == 'hline') {
      if (item.style=='dotted') {
        doc.dash(1, {space: 2});
      } else if (item.style=='dashed') {
        doc.dash(3, {space: 3});
      } else {
        doc.undash();
      }
      doc.lineWidth(item.lineWidth || 1);
      doc.moveTo(x+item.x, y+item.y);
      doc.lineTo(x+item.x+item.w, y+item.y);
      doc.stroke();
    } else if (item.type == 'vline') {
      if (item.style=='dotted') {
        doc.dash(1, {space: 2});
      } else if (item.style=='dashed') {
        doc.dash(3, {space: 3});
      } else {
        doc.undash();
      }
      doc.lineWidth(item.lineWidth || 1);
      doc.moveTo(x+item.x, y+item.y);
      doc.lineTo(x+item.x, y+item.y+item.h);
      doc.stroke();
    } else if (item.type == 'rectangle') {
  //    maxHeight = Math.max(maxHeight, item.y+item.h);
      if (item.style=='dotted') {
        doc.dash(1, {space: 2});
      } else if (item.style=='dashed') {
        doc.dash(3, {space: 3});
      } else {
        doc.undash();
      }
      doc.lineWidth(item.lineWidth || 1);
      if (typeof item.radius === 'number') {
        doc.roundedRect(x + item.x, y + item.y, item.w, item.h, item.radius);
      } else {
        doc.rect(x + item.x, y + item.y, item.w, item.h);
      }
      if (item.fillColor && item.color) {
        doc.fillAndStroke(item.fillColor, item.color);
      } else if (item.fillColor && !item.color) {
        doc.fill(item.fillColor);
      } else {
        doc.stroke();
      }
    } else if (item.type == 'circle') {
      doc.lineWidth(item.lineWidth || 1);
      doc.ellipse(x+item.x+item.w/2, y+item.y+item.h/2, item.w/2, item.h/2);
      doc.stroke();
    } else if (item.type == 'barcode') {
      if (!item.format || item.format=='code128') {
        var text = ''+th(item.text) || '';
        if (typeof item.field === 'string') {
          text = ''+row[item.field] || '';
        } else if (typeof item.field === 'function') {
          text = item.field(row, this.rowNum, this.data) || '';
        }
        doc
          .save()
          .translate(x+item.x, y+item.y).fillColor('black').path(barcode.code128(text, item.w, item.h)).fill()
          .restore();
      } else {
        doc.rect(x + item.x, y + item.y, item.w, item.h);
        doc.lineWidth(item.lineWidth || 1);
        doc.moveTo(x+item.x, y+item.y);
        doc.lineTo(x+item.x+item.w, y+item.y+item.h);
        doc.stroke();
        doc.moveTo(x+item.x+item.w, y+item.y);
        doc.lineTo(x+item.x, y+item.y+item.h);
      }
    } else {
      doc.rect(x + item.x, y + item.y, item.w, item.h);
      doc.lineWidth(item.lineWidth || 1);
      doc.moveTo(x+item.x, y+item.y);
      doc.lineTo(x+item.x+item.w, y+item.y+item.h);
      doc.stroke();
      doc.moveTo(x+item.x+item.w, y+item.y);
      doc.lineTo(x+item.x, y+item.y+item.h);
    }
  }.bind(this));

  if (section.overlay===true) {
    maxHeight = 0;
  } else {
    if (section.autoShrink===true) {
      this.offsetY += maxHeight;
    } else if (typeof section.height === 'number') {
      this.offsetY += Math.max(section.height, maxHeight);
    } else {
      this.offsetY += maxHeight;
    }
  }
  return maxHeight;
}

function pageSize2widthAndHeight(pageSize) {
  if (typeof pageSize == 'string' || pageSize instanceof String) {
    var size = sizes[pageSize.toUpperCase()];

    if (!size) {
      throw ('Page size ' + pageSize + ' not recognized');
    }

    console.log('w:', size[0], 'h:', size[1]);

    return {
      width: size[0],
      height: size[1]
    };
  }

  if (typeof pageSize.width === 'undefined'
    || typeof pageSize.height === 'undefined'
    || (typeof pageSize.width !== 'number' && ! (pageSize.width instanceof Number) )
    || (typeof pageSize.height !== 'number' && ! (pageSize.height instanceof Number) )
  ) {
    throw ('Page size ' + pageSize + ' not recognized');
  }

  return pageSize;
}

function fixPageMargins(margin) {
    if (!margin) return null;

    if (typeof margin === 'number' || margin instanceof Number) {
        margin = { left: margin, right: margin, top: margin, bottom: margin };
    } else if (margin instanceof Array) {
        if (margin.length === 2) {
            margin = { left: margin[0], top: margin[1], right: margin[0], bottom: margin[1] };
        } else if (margin.length === 4) {
            margin = { left: margin[0], top: margin[1], right: margin[2], bottom: margin[3] };
        } else throw 'Invalid pageMargins definition';
    }

    return margin;
}

function NumbertoMoney(n, c) {
    var d = ".", t = ",", s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return result;
}

module.exports = NSReport;
