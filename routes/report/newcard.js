module.exports = {
  pageSize: 'A4',
  margin: [18, 18, 18, 36], // top, right, bottom, left
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
        { type: 'image', x: 0, y: -8, fit:[525, 45], image: './images/atta_logo.png' },
        { type: 'text', align: 'left', bold: true, fontSize: 18, w: 200, h: 20, x: 50, y: 0, text: 'สมาคมไทยธุรกิจการท่องเที่ยว', },
        { type: 'text', align: 'left', bold: true, fontSize: 16, w: 200, h: 16, x: 50, y: 20, text: 'Association of Thai Travel Agents', },
        { type: 'text', align: 'right', bold: true, fontSize: 22, w: 150, h: 22, x: 388, y: 0, text: 'รายงานการออกบัตร', },
        { type: 'text', align: 'right', bold: false, fontSize: 14, w: 150, h: 14, x: 388, y: 20, field: 'headdate', },
        { type: 'text', align: 'left', bold: false, fontSize: 16, w: 80, h: 18, x: 0, y: 45, text: 'ชื่อบัญชีบัตร', },
        { type: 'text', align: 'left', bold: false, fontSize: 16, w: 150, h: 18, x: 85, y: 45, field: 'headcode', },
        { type: 'text', align: 'left', bold: false, fontSize: 16, w: 150, h: 18, x: 300, y: 45, text: 'ประเภทการออกบัตร', },
        { type: 'text', align: 'left', bold: false, fontSize: 16, w: 140, h: 18, x: 400, y: 45, field: 'isnewhead', },
        { type: 'line', x1: 0, x2: 540, y1: 70, y2: 70, lineWidth: 1, },
        { type: 'text', align: 'center', fontSize: 11, w: 35, h: 16, lineHeight:0.7, x: 0, y: 80, text: 'ลำดับ', },
        { type: 'text', align: 'left', fontSize: 11, w: 80, h: 16, lineHeight:0.7, x: 35, y: 80, text: 'วันที่ เวลา', },
        { type: 'text', align: 'left', fontSize: 11, w: 180, h: 16, lineHeight:0.7, x: 100, y: 80, text: 'ชื่อบริษัท', },
        { type: 'text', align: 'left', fontSize: 11, w: 50, h: 16, lineHeight:0.7, x: 280, y: 80, text: 'ประเภท', },
        { type: 'text', align: 'left', fontSize: 11, w: 80, h: 16, lineHeight:0.7, x: 330, y: 80, text: 'หมายเลขบรัตร', },
        { type: 'text', align: 'left', fontSize: 11, w: 50, h: 16, lineHeight:0.7, x: 410, y: 80, text: 'รหัสอ้างอิง', },
        { type: 'text', align: 'left', fontSize: 11, w: 40, h: 16, lineHeight:0.7, x: 460, y: 80, text: 'ผู้ทำรายการ', },
        { type: 'text', align: 'left', fontSize: 11, w: 40, h: 16, lineHeight:0.7, x: 500, y: 80, text: 'หมายเหตุ', },
        { type: 'line', x1: 0, x2: 540, y1: 100, y2: 100, lineWidth: 1, },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        { type: 'number', align: 'right', fontSize: 11, w: 35, h: 16, lineHeight:0.7, x: 0, y: 0, field: 'no', },
        { type: 'text', align: 'left', fontSize: 11, w: 80, h: 16, lineHeight:0.7, x: 35, y: 0, field: 'issue_date', },
        { type: 'text', align: 'left', fontSize: 11, w: 180, h: 16, lineHeight:0.7, x: 100, y: 0, field: 'name_th', },
        { type: 'text', align: 'left', fontSize: 11, w: 50, h: 16, lineHeight:0.7, x: 280, y: 0, field: 'code', },
        { type: 'text', align: 'left', fontSize: 11, w: 80, h: 16, lineHeight:0.7, x: 330, y: 0, field: 'code', },
        { type: 'text', align: 'left', fontSize: 11, w: 50, h: 16, lineHeight:0.7, x: 410, y: 0, field: 'amount', },
        { type: 'text', align: 'left', fontSize: 11, w: 40, h: 16, lineHeight:0.7, x: 460, y: 0, field: 'amount', },
        { type: 'text', align: 'left', fontSize: 11, w: 40, h: 16, lineHeight:0.7, x: 500, y: 0, field: 'amount', },
        { type: 'line', x1: 0, x2: 540, y1: 16, y2: 16, lineWidth: 0.5, style:'dotted' },
      ]
    }
  ],
  PF: [
    {
      autoShrink: true,
      items: [
        { type: 'line', x1: 0, x2: 0, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 37, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 80, x2: 80, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 140, x2: 140, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 200, x2: 200, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 385, x2: 385, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 436, x2: 436, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 487, x2: 487, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 540, x2: 540, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 0, x2: 540, y1: 2, y2: 2, lineWidth: 1 },
      ]
    }
  ],
  RF: [
    {
      autoShrink: true,
      items: [

      ]
    }
  ]
};
