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
        { type: 'text', align: 'left', bold: false, fontSize: 12, w: 200, h: 14, x: 0, y: 0, text: 'ชื่อผู้ประกอบการ: สมาคมไทยธุรกิจการท่องเที่ยว', },
        { type: 'text', align: 'left', bold: true, fontSize: 16, w: 80, h: 16, x: 230, y: 3, text: 'รายงานภาษีขาย', },
        { type: 'text', align: 'right', bold: false, fontSize: 12, w: 150, h: 14, x: 388, y: 0, text: 'เลขประจําตัวผูเสียภาษีอากร: 0109511000062', },
        { type: 'text', align: 'left', bold: false, fontSize: 12, w: 200, h: 14, x: 0, y: 18, text: 'ชื่อสถานประกอบการ: สมาคมไทยธุรกิจการท่องเที่ยว', },
        { type: 'text', align: 'left', bold: false, fontSize: 12, w: 130, h: 14, x: 209, y: 20, field: 'date_from_to', },
        { type: 'text', align: 'right', bold: false, fontSize: 12, w: 150, h: 14, x: 388, y: 18, text: 'สำนักงานใหญ่', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 37, h: 16, x: 0, y: 58, text: 'ลำดับ', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 163, h: 14, x: 37, y: 52, text: 'ใบกำกับภาษี', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 43, h: 14, x: 37, y: 68, text: 'วันที่', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 60, h: 14, x: 80, y: 68, text: 'เล่มที่/เลขที่', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 60, h: 14, x: 140, y: 68, text: 'เลขที่เอกสาร', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 185, h: 16, x: 200, y: 58, text: 'ชื่อบริษัท', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 51, h: 14, x: 385, y: 52, text: 'มูลค่าสินค้า', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 51, h: 14, x: 385, y: 68, text: 'หรือบริการ', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 51, h: 14, x: 436, y: 52, text: 'ภาษีมูลค่า', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 51, h: 14, x: 436, y: 68, text: 'เพิ่ม 7%', },
        { type: 'text', align: 'center', bold: true, fontSize: 12, w: 53, h: 16, x: 487, y: 58, text: 'จำนวนเงิน', },
        { type: 'line', x1: 0, x2: 0, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 37, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 80, x2: 80, y1: 66, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 140, x2: 140, y1: 66, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 200, x2: 200, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 385, x2: 385, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 436, x2: 436, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 487, x2: 487, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 540, x2: 540, y1: 50, y2: 82, lineWidth: 0.5, },
        { type: 'line', x1: 0, x2: 540, y1: 50, y2: 50, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 200, y1: 66, y2: 66, lineWidth: 0.5, },
        { type: 'line', x1: 0, x2: 540, y1: 82, y2: 82, lineWidth: 0.5, },
      ]
    }
  ],
  DT: [
    {
      autoShrink: true,
      items: [

        { type: 'number', align: 'right', fontSize: 11, w: 35, h: 16, lineHeight:0.7, x: 0, y: 0, field: 'no', },
        { type: 'text', align: 'center', fontSize: 11, w: 43, h: 16, lineHeight:0.7, x: 37, y: 0, field: 'issue_date', },
        { type: 'text', align: 'center', fontSize: 11, w: 60, h: 16, lineHeight:0.7, x: 80, y: 0, field: 'code', },
        { type: 'text', align: 'center', fontSize: 11, w: 60, h: 16, lineHeight:0.7, x: 140, y: 0, field: 'code', },
        { type: 'text', align: 'left', fontSize: 11, w: 185, h: 16, lineHeight:0.7, x: 202, y: 0, field: 'name_th', },
        { type: 'text', align: 'right', fontSize: 11, w: 49, h: 16, lineHeight:0.7, x: 385, y: 0, field: 'amount', },
        { type: 'text', align: 'right', fontSize: 11, w: 47, h: 16, lineHeight:0.7, x: 438, y: 0, field: 'vat_amount', },
        { type: 'text', align: 'right', fontSize: 10, w: 51, h: 16, lineHeight:0.7, x: 487, y: 0, field: 'total_amount', },
        { type: 'line', x1: 0, x2: 0, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 37, x2: 37, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 80, x2: 80, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 140, x2: 140, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 200, x2: 200, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 385, x2: 385, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 436, x2: 436, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 487, x2: 487, y1: 0, y2: 16, lineWidth: 0.5, },
        { type: 'line', x1: 540, x2: 540, y1: 0, y2: 16, lineWidth: 0.5, },
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
