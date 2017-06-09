module.exports = {
  pageSize: 'A4',
  pageOrientation: 'landscape',
  margin: [18, 18, 18, 18], // top, right, bottom, left
  RH: [
    {
      items: []
    }
  ],
  PH: [
    {
      height: 100,
      autoShrink: true,
      items: [
        { type: 'image', x: 10, y: -8, fit:[525, 45], image: './images/atta_logo.png' },
        { type: 'line', x1: 10, x2: 800, y1: 55, y2: 55, lineWidth: 1, },
        { type: 'line', x1: 10, x2: 10, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 50, x2: 50, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 260, x2: 260, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 300, x2: 300, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 340, x2: 340, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 380, x2: 380, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 420, x2: 420, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 460, x2: 460, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 500, x2: 500, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 540, x2: 540, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 580, x2: 580, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 620, x2: 620, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 660, x2: 660, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 700, x2: 700, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 740, x2: 740, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 800, x2: 800, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 73, y2: 73, lineWidth: 1, },
        { type: 'text', align: 'left', bold: true, fontSize: 16, w: 150, h: 18, x: 63, y: 5, text: 'สมาคมไทยธุรกิจการท่องเที่ยว',},
        { type: 'text', align: 'left', bold: true, fontSize: 14, w: 150, h: 16, x: 63, y: 23, text: 'Association of Thai Travel Agents',},
        { type: 'text', align: 'right', bold: true, fontSize: 16, w: 250, h: 18, x: 550, y: 5, field: 'report_name',},
        { type: 'text', align: 'right', bold: true, fontSize: 16, w: 250, h: 16, x: 550, y: 23, field: 'airport',},
        // { type: 'text', align: 'center', bold:false, fontSize: 16, w: 800, h: 16, x: 0, y: 39, field: 'months',},
        // { type: 'text', align: 'center', bold: true, fontSize: 14, w: 800, h: 16, x: 0, y: 35, field: 'codename', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 10, y: 58, text: 'ลำดับ', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 208, h: 10, x: 52, y: 58, text: 'ชื่อ', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 260, y: 58, text: 'มกราคม', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 300, y: 58, text: 'กุมภาพันธ์', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 340, y: 58, text: 'มีนาคม', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 380, y: 58, text: 'เมษายน', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 420, y: 58, text: 'พฤษภาคม', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 460, y: 58, text: 'มิถุนายน', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 500, y: 58, text: 'กรกฎาคม', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 540, y: 58, text: 'สิงหาคม', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 580, y: 58, text: 'กันยายน', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 620, y: 58, text: 'ตุลาคม', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 660, y: 58, text: 'พฤศจิกายน', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 700, y: 58, text: 'ธันวาคม', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 58, h: 10, x: 740, y: 58, text: 'จำนวน', },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 10, y: 1, field: 'no', },
        { type: 'text', align: 'left', bold: true, fontSize: 11, w: 208, h: 10, x: 52, y: 1, field: 'name_en', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 260, y: 1, field: 'jan', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 300, y: 1, field: 'feb', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 340, y: 1, field: 'mar', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 380, y: 1, field: 'apr', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 420, y: 1, field: 'may', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 460, y: 1, field: 'jun', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 500, y: 1, field: 'july', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 540, y: 1, field: 'aug', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 580, y: 1, field: 'sep', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 620, y: 1, field: 'oct', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 660, y: 1, field: 'nov', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 38, h: 10, x: 700, y: 1, field: 'dec', },
        { type: 'text', align: 'right', bold: true, fontSize: 11, w: 58, h: 10, x: 740, y: 1, field: 'sum', },
        { type: 'line', x1: 10, x2: 10, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 50, x2: 50, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;}, },
        { type: 'line', x1: 260, x2: 260, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 300, x2: 300, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 340, x2: 340, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 380, x2: 380, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 420, x2: 420, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 460, x2: 460, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 500, x2: 500, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 540, x2: 540, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 580, x2: 580, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 620, x2: 620, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 660, x2: 660, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 700, x2: 700, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 740, x2: 740, y1: 0, y2: 18, lineWidth: 0.5, show: function(item) {return item.line;},},
        { type: 'line', x1: 800, x2: 800, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 18, y2: 18, lineWidth: 0.5, },
      ]
    }
  ],
  PF: [
    {
      autoShrink: true,
      items: [
        // { type: 'line', x1: 10, x2: 10, y1: 0, y2: 2, lineWidth: 0.5, },
        // { type: 'line', x1: 70, x2: 70, y1: 0, y2: 2, lineWidth: 0.5, },
        // { type: 'line', x1: 150, x2: 150, y1: 0, y2: 2, lineWidth: 0.5, },
        // { type: 'line', x1: 490, x2: 490, y1: 0, y2: 2, lineWidth: 0.5, },
        // { type: 'line', x1: 570, x2: 570, y1: 0, y2: 2, lineWidth: 0.5, },
        // { type: 'line', x1: 640, x2: 640, y1: 0, y2: 2, lineWidth: 0.5, },
        // { type: 'line', x1: 720, x2: 720, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 0, y2: 0, lineWidth: 1 },
        // { type: 'line', x1: 800, x2: 800, y1: 0, y2: 0, lineWidth: 0.5, },
      ]
    }
  ],
  RF: [
    {
      autoShrink: true,
      items: [
        // { type: 'line', x1: 10, x2: 800, y1: 0, y2: 0, lineWidth: 0.5, },
        // { type: 'line', x1: 490, x2: 490, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 10, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 800, x2: 800, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 18, y2: 18, lineWidth: 1 },
        // { type: 'text', align: 'right', fontSize: 10, w: 278, h: 18, lineHeight:0.7, x: 150, y: 0, text: 'รวมยอดเงิน', },
        { type: 'text', align: 'right', fontSize: 11, w: 98, h: 18, lineHeight:0.7, x: 700, y: 0, field: 'total', },
      ]
    }
  ]
};
