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
    var arcAngle = endAngle-startAngle, largeArc = (arcAngle > Math.PI) != (startAngle > endAngle) != anticlockwise;
    return this.moveTo(e.X, e.Y).lineTo(x, y).lineTo(s.X, s.Y)
    .path("M "+s.X+","+s.Y+" A "+radius+","+radius+" 0 "+(largeArc?"1":"0")+","+(anticlockwise?"0":"1")+" "+e.X+","+e.Y);
};


var NSGraph = function() {
	console.log('new NSGraph');
	this.Draw = function(config, raw, name, item){	    
		var RadiansSum = 0;
		var font = 22;
		var padding = 10;
		var centerX = Math.floor(this.w / 2);
		var centerY = Math.floor(this.h / 2);
		var radius = Math.floor(this.w / 2 / 2);
		var padding = 5;

  var pageFooter = config.pageFooter || false;
  var pageView = config.pageView || 'table';
  var pageSize = pageSize2widthAndHeight(config.pageSize || 'a4');
  config.pageOrientation = config.pageOrientation || 'portrait';
  if (config.pageOrientation.toLowerCase() === 'landscape') {
    pageSize = { width: pageSize.height, height: pageSize.width};
    pageSize.orientation = 'landscape';
  } else {
    pageSize.orientation = 'portrait';
  }

  this.pdfKitDoc = new pdfkit({
      size: [pageSize.width, pageSize.height],
      compress: true,
      bufferPages: false,
      margin: 72
    }, {
      Producer: 'NSGraph',
      Creator: 'NSGraph',
      Title: 'NSGraph',
      Author: 'NSGraph',
      Subject: 'NSGraph',
      Keywords: 'NSGraph'
    });

  this.pdfKitDoc.registerFont('THSarabunNew1', fontNormal, 'TH Sarabun New');
  this.pdfKitDoc.registerFont('THSarabunNew1-Bold', fontBold, 'TH Sarabun New Bold');

  this.x = config.margin[3];
  this.y = config.margin[0];
  this.w = pageSize.width;
  this.h = pageSize.height;
  this.offsetX = this.x;
  this.offsetY = this.y;
  this.fontCount = [0,0];
  this.numFont = [1,1];
  this.data = data;




		this.pdfKitDoc.save(); //.scale(0.5);

		var sum = 0;
		for (var i = 0; i < raw.length; i++) { sum += raw[i].value; }

		for (var i = 0; i < raw.length; i++) {
			var data = raw[i].value * 360 / sum;
			origin = [centerX/2+this.x+padding, centerY+this.y+padding];

			var startAngle = this.toRadians(RadiansSum);
			var centerAngle = startAngle + this.toRadians(data) / 2;
			var endAngle = startAngle + this.toRadians(data);


			this.pdfKitDoc.font('THSarabunNew1-Bold').fontSize(font+16);
			this.pdfKitDoc.fill('#000').text(name, this.x+padding, this.y+padding+20,{ width: pageSize.width-padding*2, align: 'center' });

			this.pdfKitDoc.fontSize(font).lineJoin('round').lineWidth(3);

			var an = this.pdfKitDoc.angle(origin[0], origin[1], radius, centerAngle);
			var percent = (raw[i].value * 100 / sum).toFixed(2)+'%';

    		var colors = raw[i].colors || (['#468966', '#FFF0A5', '#FFB03B', '#B64926', '#8E2800', '#8E2800', '#E74C3C', '#ECF0F1', '#3498DB', '#0B61B9'])[i];

			this.pdfKitDoc.arc(origin[0], origin[1], radius, startAngle, endAngle, false).fillAndStroke(colors, '#FFF');

			var prop = { width: 60, align: 'left' };
			this.pdfKitDoc.fontSize(font-4).fill('#000');
			if(centerAngle > Math.PI * 1.5) { // Left Top

			} else if(centerAngle > Math.PI) { // Left Bottom

			} else if(centerAngle > Math.PI / 2) { // Right Bottom
				prop.align = "right";

			} else { // Right Top
				prop.align = "right";
			}
			// this.pdfKitDoc.text(percent, an.X, an.Y, prop); //.rotate(90, { origin: origin });
			var top = (centerY - ((raw.length - 2) * font) / 2) + (font * i) - ((raw.length - 2) * padding);

			this.pdfKitDoc.rect(20+this.x+centerX + radius / padding , this.y+top + i*padding, font, font).fillAndStroke(colors, colors);
			this.pdfKitDoc.fontSize(font).fill('#000').text(raw[i].label+' '+percent, 20+font + padding + this.x + centerX + radius / padding, (this.y+top+i*padding)-2);

			RadiansSum += data;
		}

		this.pdfKitDoc.restore();
		return this.pdfKitDoc;
	}
	this.toRadians = function(degrees) { return (degrees * Math.PI)/180; }
}

NSGraph.prototype.createDocument = function(config, data) {
  return this.Draw(config, data, "ลูกหนี้ CA 2", 2);
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

module.exports = NSGraph;
