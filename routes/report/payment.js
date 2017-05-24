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
        { type: 'line', x1: 70, x2: 70, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 150, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 490, x2: 490, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 640, x2: 640, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 720, x2: 720, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 800, x2: 800, y1: 55, y2: 73, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 73, y2: 73, lineWidth: 1, },
        { type: 'text', align: 'left', bold: true, fontSize: 16, w: 150, h: 18, x: 63, y: 5, text: 'สมาคมไทยธุรกิจการท่องเที่ยว',},
        { type: 'text', align: 'left', bold: true, fontSize: 14, w: 150, h: 16, x: 63, y: 23, text: 'Association of Thai Travel Agents',},
        { type: 'text', align: 'right', bold: true, fontSize: 16, w: 150, h: 18, x: 650, y: 5, text: 'รายงานการชำระเงิน',},
        // { type: 'text', align: 'center', bold: true, fontSize: 14, w: 800, h: 16, x: 0, y: 35, field: 'codename', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 10, y: 58, text: 'ลำดับ', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 80, h: 10, x: 70, y: 58, text: 'รหัสสมาชิก', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 340, h: 10, x: 150, y: 58, text: 'ชื่อสมาชิก', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 80, h: 10, x: 490, y: 58, text: 'ใบเร้๗รับเงินเลขที่', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 70, h: 10, x: 570, y: 58, text: 'จำนวน', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 80, h: 10, x: 640, y: 58, text: 'จำนวนเงิน', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 80, h: 10, x: 720, y: 58, text: 'วันที่รับเงิน', },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        { type: 'number', align: 'center', fontSize: 10, w: 60, h: 18, lineHeight:0.7, x: 10, y: 0, field: 'no', },
        { type: 'text', align: 'center', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 72, y: 0, field: 'mem_code', },
        { type: 'text', align: 'left', fontSize: 10, w: 278, h: 18, lineHeight:0.7, x: 152, y: 0, field: 'name', },
        { type: 'text', align: 'center', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 490, y: 0, field: 'code', },
        { type: 'text', align: 'right', fontSize: 10, w: 68, h: 18, lineHeight:0.7, x: 570, y: 0, text: '1', },
        { type: 'text', align: 'right', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 640, y: 0, field: 'total_amount', },
        { type: 'text', align: 'center', fontSize: 10, w: 80, h: 18, lineHeight:0.7, x: 720, y: 0, field: 'issue_date', },
        { type: 'line', x1: 10, x2: 10, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 70, x2: 70, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 150, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 490, x2: 490, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 640, x2: 640, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 720, x2: 720, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 800, x2: 800, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 18, y2: 18, lineWidth: 0.5, style:'dotted' },
      ]
    }
  ],
  PF: [
    {
      autoShrink: true,
      items: [
        { type: 'line', x1: 10, x2: 10, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 70, x2: 70, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 150, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 490, x2: 490, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 640, x2: 640, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 720, x2: 720, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 10, x2: 800, y1: 2, y2: 2, lineWidth: 1 },
        { type: 'line', x1: 800, x2: 800, y1: 0, y2: 2, lineWidth: 0.5, },
      ]
    }
  ],
  RF: [
    {
      autoShrink: true,
      items: [
        { type: 'line', x1: 150, x2: 150, y1: 0, y2: 18, lineWidth: 0.5, },
        // { type: 'line', x1: 490, x2: 490, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 640, x2: 640, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 720, x2: 720, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 720, y1: 18, y2: 18, lineWidth: 1 },
        // { type: 'text', align: 'right', fontSize: 10, w: 278, h: 18, lineHeight:0.7, x: 150, y: 0, text: 'รวมยอดเงิน', },
        { type: 'text', align: 'right', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 490, y: 0, text: 'รวมยอดเงิน', },
        { type: 'text', align: 'right', fontSize: 10, w: 68, h: 18, lineHeight:0.7, x: 570, y: 0, field: 'all_qty', },
        { type: 'text', align: 'right', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 640, y: 0, field: 'all_pax', },
      ]
    }
  ]
};
