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
        { type: 'line', x1: 0, x2: 800, y1: 45, y2: 45, lineWidth: 1, },

        { type: 'line', x1: 0, x2: 0, y1: 45, y2: 81, lineWidth: 0.5, },

        { type: 'line', x1: 40, x2: 40, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 150, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 210, x2: 210, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 390, x2: 390, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 450, x2: 450, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 510, x2: 510, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 63, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 630, x2: 630, y1: 63, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 690, x2: 690, y1: 63, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 740, x2: 740, y1: 63, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 800, x2: 800, y1: 45, y2: 81, lineWidth: 0.5, },
        { type: 'line', x1: 510, x2: 800, y1: 63, y2: 63, lineWidth: 1, },
        { type: 'line', x1: 0, x2: 800, y1: 81, y2: 81, lineWidth: 1, },
        { type: 'text', align: 'center', bold: true, fontSize: 16, w: 800, h: 18, x: 0, y: 5, text: 'ตารงตรวจเช็ครถ เวรชานชาลา(SPOT CHECK)',},
        { type: 'text', align: 'center', bold: true, fontSize: 14, w: 800, h: 16, x: 0, y: 23, field: 'datehead',},
        // { type: 'text', align: 'center', bold: true, fontSize: 14, w: 800, h: 16, x: 0, y: 35, field: 'codename', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 0, y: 57, text: 'ลำดับ', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 110, h: 10, x: 40, y: 57, text: 'เลขที่ใบแจ้ง', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 150, y: 57, text: 'เลขที่ใบแจ้งอ้างอิง', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 180, h: 10, x: 210, y: 57, text: 'ชื่อบริษัท', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 390, y: 57, text: 'Flight', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 450, y: 57, text: 'ทะเบียนรถ', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 290, h: 10, x: 510, y: 48, text: 'รวมมาจริง', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 510, y: 66, text: 'จำนวนแจ้ง', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 570, y: 66, text: 'รวมมาจริง', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 630, y: 66, text: 'ผู้ใหญ่', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 50, h: 10, x: 690, y: 66, text: 'เด็ก', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 740, y: 66, text: 'หัวหน้าทัวร์', },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        { type: 'number', align: 'center', fontSize: 10, w: 40, h: 18, lineHeight:0.7, x: 0, y: 0, field: 'no', },
        { type: 'text', align: 'left', fontSize: 10, w: 108, h: 18, lineHeight:0.7, x: 42, y: 0, field: 'code', },
        { type: 'text', align: 'center', fontSize: 10, w: 60, h: 18, lineHeight:0.7, x: 150, y: 0, field: 'ref_code', },
        { type: 'text', align: 'left', fontSize: 10, w: 178, h: 18, lineHeight:0.7, x: 212, y: 0, field: 'mem_name', },
        { type: 'text', align: 'center', fontSize: 10, w: 60, h: 18, lineHeight:0.7, x: 390, y: 0, field: 'flight', },
        { type: 'text', align: 'center', fontSize: 10, w: 60, h: 18, lineHeight:0.7, x: 450, y: 0, field: 'license_list', },
        { type: 'text', align: 'right', fontSize: 10, w: 58, h: 18, lineHeight:0.7, x: 510, y: 0, field: 'total_pax', },
        { type: 'text', align: 'right', fontSize: 11, w: 58, h: 10, lineHeight:0.7, x: 570, y: 0, field: 'total', },
        { type: 'text', align: 'right', fontSize: 11, w: 58, h: 10, lineHeight:0.7, x: 630, y: 0, field: 'check_pax', },
        { type: 'text', align: 'right', fontSize: 11, w: 48, h: 10, lineHeight:0.7, x: 690, y: 0, field: 'check_pax_child', },
        { type: 'text', align: 'right', fontSize: 11, w: 58, h: 10, lineHeight:0.7, x: 740, y: 0, field: 'check_pax_leader', },

        { type: 'line', x1: 0, x2: 0, y1: 0, y2: 18, lineWidth: 0.5, },

        { type: 'line', x1: 40, x2: 40, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 150, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 210, x2: 210, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 390, x2: 390, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 450, x2: 450, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 510, x2: 510, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 630, x2: 630, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 690, x2: 690, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 740, x2: 740, y1: 0, y2: 18, lineWidth: 0.5, },
        { type: 'line', x1: 800, x2: 800, y1: 0, y2: 18, lineWidth: 0.5, },

        { type: 'line', x1: 0, x2: 800, y1: 18, y2: 18, lineWidth: 0.5, style:'dotted' },
      ]
    }
  ],
  PF: [
    {
      autoShrink: true,
      items: [
        { type: 'line', x1: 0, x2: 0, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 40, x2: 40, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 150, x2: 150, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 210, x2: 210, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 390, x2: 390, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 450, x2: 450, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 510, x2: 510, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 570, x2: 570, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 630, x2: 630, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 690, x2: 690, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 740, x2: 740, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 0, x2: 800, y1: 2, y2: 2, lineWidth: 1 },
        { type: 'line', x1: 800, x2: 800, y1: 0, y2: 2, lineWidth: 0.5, },
      ]
    }
  ],
  RF: [
    {
      autoShrink: true,
      items: [
        // { type: 'line', x1: 150, x2: 150, y1: 0, y2: 18, lineWidth: 0.5, },
        // // { type: 'line', x1: 490, x2: 490, y1: 0, y2: 18, lineWidth: 0.5, },
        // { type: 'line', x1: 570, x2: 570, y1: 0, y2: 18, lineWidth: 0.5, },
        // { type: 'line', x1: 640, x2: 640, y1: 0, y2: 18, lineWidth: 0.5, },
        // { type: 'line', x1: 720, x2: 720, y1: 0, y2: 18, lineWidth: 0.5, },
        // { type: 'line', x1: 150, x2: 720, y1: 18, y2: 18, lineWidth: 1 },
        // // { type: 'text', align: 'right', fontSize: 10, w: 278, h: 18, lineHeight:0.7, x: 150, y: 0, text: 'รวมยอดเงิน', },
        // { type: 'text', align: 'right', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 490, y: 0, text: 'รวมยอดเงิน', },
        // { type: 'text', align: 'right', fontSize: 10, w: 68, h: 18, lineHeight:0.7, x: 570, y: 0, field: 'all_qty', },
        // { type: 'text', align: 'right', fontSize: 10, w: 78, h: 18, lineHeight:0.7, x: 640, y: 0, field: 'all_pax', },
      ]
    }
  ]
};
