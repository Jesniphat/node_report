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
        { type: 'image', x: 17, y: -8, fit:[525, 45], image: './images/Pickup-Schedule_03.png' },
        { type: 'text', align: 'center', bold: true, fontSize: 14, w: 200, h: 14, x: 330, y: 0, field: 'pickup_schedule', },
        { type: 'text', align: 'center', bold: false, fontSize: 10, w: 200, h: 14, x: 330, y: 13, field: 'driver_plate', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 20, h: 10, x: 17, y: 53, text: 'NO', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 100, h: 10, x: 37, y: 53, text: 'CONTACT NAME/COMPANY', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 145, h: 10, x: 137, y: 53, text: 'ADDRESS', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 55, h: 10, x: 282, y: 53, text: 'TEL', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 47, h: 10, x: 337, y: 53, text: 'TIME', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 40, h: 10, x: 384, y: 53, text: 'QUANTITY', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 60, h: 10, x: 424, y: 53, text: 'SENDER SIGN', },
        { type: 'text', align: 'center', bold: true, fontSize: 11, w: 58, h: 10, x: 484, y: 53, text: 'REMARK', },
        { type: 'line', x1: 17, x2: 17, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 37, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 137, x2: 137, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 282, x2: 282, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 337, x2: 337, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 384, x2: 384, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 424, x2: 424, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 484, x2: 484, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 542, x2: 542, y1: 49, y2: 68, lineWidth: 0.5, },
        { type: 'line', x1: 17, x2: 542, y1: 49, y2: 49, lineWidth: 1, },
        { type: 'line', x1: 17, x2: 542, y1: 68, y2: 68, lineWidth: 1, },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        { type: 'number', align: 'center', fontSize: 10, w: 12, h: 38, lineHeight:0.7, x: 21, y: 0, field: 'no', },
        { type: 'text', align: 'left', fontSize: 10, w: 92, h: 38, lineHeight:0.7, x: 41, y: 0, field: 'code', },
        { type: 'text', align: 'left', fontSize: 10, w: 137, h: 38, lineHeight:0.7, x: 141, y: 0, field: 'period_code', },
        { type: 'text', align: 'left', fontSize: 10, w: 47, h: 38, lineHeight:0.7, x: 286, y: 0, field: 'flight', },
        { type: 'text', align: 'left', fontSize: 10, w: 39, h: 38, lineHeight:0.7, x: 341, y: 0, text: '', },
        { type: 'text', align: 'right', fontSize: 10, w: 32, h: 38, lineHeight:0.7, x: 388, y: 0, field: 'group_name', },
        { type: 'text', align: 'left', fontSize: 10, w: 52, h: 38, lineHeight:0.7, x: 428, y: 0, text: '', },
        { type: 'text', align: 'left', fontSize: 10, w: 50, h: 38, lineHeight:0.7, x: 488, y: 0, text: '', },
        { type: 'line', x1: 17, x2: 17, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 37, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 137, x2: 137, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 282, x2: 282, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 337, x2: 337, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 384, x2: 384, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 424, x2: 424, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 484, x2: 484, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 542, x2: 542, y1: 0, y2: 38, lineWidth: 0.5, },
        { type: 'line', x1: 17, x2: 542, y1: 38, y2: 38, lineWidth: 0.5, style:'dotted' },
      ]
    }
  ],
  PF: [
    {
      autoShrink: true,
      items: [
        { type: 'line', x1: 17, x2: 17, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 37, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 137, x2: 137, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 282, x2: 282, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 337, x2: 337, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 384, x2: 384, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 424, x2: 424, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 484, x2: 484, y1: 0, y2: 2, lineWidth: 0.5, },
        { type: 'line', x1: 17, x2: 542, y1: 2, y2: 2, lineWidth: 1 },
        { type: 'line', x1: 542, x2: 542, y1: 0, y2: 2, lineWidth: 0.5, },
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
