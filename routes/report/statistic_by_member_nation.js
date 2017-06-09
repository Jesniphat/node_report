module.exports = {
  pageSize: 'A4',
  margin: [18, 18, 18, 36], // top, right, bottom, left
  // pageFooter: true,
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
        { type: 'text', align: 'right', bold: true, fontSize: 22, w: 200, h: 22, x: 338, y: 0, text: 'รายการสถิติแยกตามสมาชิก/สัญชาติ', },
        { type: 'text', align: 'right', bold: false, fontSize: 14, w: 300, h: 14, x: 238, y: 20, field: 'airport', },
        
        { type: 'line', x1: 0, x2: 540, y1: 42, y2: 42, lineWidth: 1, },
        // { type: 'text', align: 'center', fontSize: 11, w: 35, h: 16, lineHeight:0.7, x: 0, y: 45, text: 'ลำดับ', },
        { type: 'text', align: 'center', fontSize: 11, w: 65, h: 16, lineHeight:0.7, x: 0, y: 45, text: 'รหัส', },
        { type: 'text', align: 'left', fontSize: 11, w: 395, h: 16, lineHeight:0.7, x: 65, y: 45, text: 'ชื่อสมาชิก', },
        { type: 'text', align: 'right', fontSize: 11, w: 78, h: 16, lineHeight:0.7, x: 460, y: 45, text: 'จำนวนนักท่องเที่ยว', },
        { type: 'line', x1: 0, x2: 540, y1: 60, y2: 60, lineWidth: 1, },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        // { type: 'number', align: 'right', fontSize: 11, w: 35, h: 16, lineHeight:0.7, x: 0, y: 0, field: 'no', },
        { type: 'text', align: 'left', fontSize: 11, w: 65, h: 16, lineHeight:0.7, x: 0, y: 0, field: 'code', },
        { type: 'text', align: 'left', fontSize: 11, w: 395, h: 16, lineHeight:0.7, x: 65, y: 0, field: 'name', },
        { type: 'text', align: 'right', fontSize: 11, w: 75, h: 16, lineHeight:0.7, x: 460, y: 0, field: 'cnt', },
        { type: 'line', x1: 0, x2: 540, y1: 16, y2: 16, lineWidth: 0.5, style:'dotted' },
      ]
    }
  ],
  PF: [
    {
      autoShrink: true,
      items: [
        // { type: 'line', x1: 0, x2: 540, y1: 0, y2: 0, lineWidth: 1 },
      ]
    }
  ],
  RF: [
    {
      autoShrink: true,
      items: [
        { type: 'line', x1: 0, x2: 540, y1: 0, y2: 0, lineWidth: 1 },
        { type: 'text', align: 'right', fontSize: 11, w: 75, h: 16, lineHeight:0.7, x: 460, y: 0, field: 'total', },
        { type: 'line', x1: 0, x2: 540, y1: 18, y2: 18, lineWidth: 1 },
      ]
    }
  ]
};
