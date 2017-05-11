var q = require('q');

// nsHelper.factory('helper', ['$filter', function($filter) {
	var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
	var newUUID = function() {
		var d0 = Math.random()*0xffffffff|0;
		var d1 = Math.random()*0xffffffff|0;
		var d2 = Math.random()*0xffffffff|0;
		var d3 = Math.random()*0xffffffff|0;
		return (lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
			lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff]).toUpperCase();
	}

	////////////////////////////////////////
	// md5
	////////////////////////////////////////
	function md5cycle(x, k) {
		var a = x[0], b = x[1], c = x[2], d = x[3];

		a = ff(a, b, c, d, k[0], 7, -680876936);
		d = ff(d, a, b, c, k[1], 12, -389564586);
		c = ff(c, d, a, b, k[2], 17,  606105819);
		b = ff(b, c, d, a, k[3], 22, -1044525330);
		a = ff(a, b, c, d, k[4], 7, -176418897);
		d = ff(d, a, b, c, k[5], 12,  1200080426);
		c = ff(c, d, a, b, k[6], 17, -1473231341);
		b = ff(b, c, d, a, k[7], 22, -45705983);
		a = ff(a, b, c, d, k[8], 7,  1770035416);
		d = ff(d, a, b, c, k[9], 12, -1958414417);
		c = ff(c, d, a, b, k[10], 17, -42063);
		b = ff(b, c, d, a, k[11], 22, -1990404162);
		a = ff(a, b, c, d, k[12], 7,  1804603682);
		d = ff(d, a, b, c, k[13], 12, -40341101);
		c = ff(c, d, a, b, k[14], 17, -1502002290);
		b = ff(b, c, d, a, k[15], 22,  1236535329);

		a = gg(a, b, c, d, k[1], 5, -165796510);
		d = gg(d, a, b, c, k[6], 9, -1069501632);
		c = gg(c, d, a, b, k[11], 14,  643717713);
		b = gg(b, c, d, a, k[0], 20, -373897302);
		a = gg(a, b, c, d, k[5], 5, -701558691);
		d = gg(d, a, b, c, k[10], 9,  38016083);
		c = gg(c, d, a, b, k[15], 14, -660478335);
		b = gg(b, c, d, a, k[4], 20, -405537848);
		a = gg(a, b, c, d, k[9], 5,  568446438);
		d = gg(d, a, b, c, k[14], 9, -1019803690);
		c = gg(c, d, a, b, k[3], 14, -187363961);
		b = gg(b, c, d, a, k[8], 20,  1163531501);
		a = gg(a, b, c, d, k[13], 5, -1444681467);
		d = gg(d, a, b, c, k[2], 9, -51403784);
		c = gg(c, d, a, b, k[7], 14,  1735328473);
		b = gg(b, c, d, a, k[12], 20, -1926607734);

		a = hh(a, b, c, d, k[5], 4, -378558);
		d = hh(d, a, b, c, k[8], 11, -2022574463);
		c = hh(c, d, a, b, k[11], 16,  1839030562);
		b = hh(b, c, d, a, k[14], 23, -35309556);
		a = hh(a, b, c, d, k[1], 4, -1530992060);
		d = hh(d, a, b, c, k[4], 11,  1272893353);
		c = hh(c, d, a, b, k[7], 16, -155497632);
		b = hh(b, c, d, a, k[10], 23, -1094730640);
		a = hh(a, b, c, d, k[13], 4,  681279174);
		d = hh(d, a, b, c, k[0], 11, -358537222);
		c = hh(c, d, a, b, k[3], 16, -722521979);
		b = hh(b, c, d, a, k[6], 23,  76029189);
		a = hh(a, b, c, d, k[9], 4, -640364487);
		d = hh(d, a, b, c, k[12], 11, -421815835);
		c = hh(c, d, a, b, k[15], 16,  530742520);
		b = hh(b, c, d, a, k[2], 23, -995338651);

		a = ii(a, b, c, d, k[0], 6, -198630844);
		d = ii(d, a, b, c, k[7], 10,  1126891415);
		c = ii(c, d, a, b, k[14], 15, -1416354905);
		b = ii(b, c, d, a, k[5], 21, -57434055);
		a = ii(a, b, c, d, k[12], 6,  1700485571);
		d = ii(d, a, b, c, k[3], 10, -1894986606);
		c = ii(c, d, a, b, k[10], 15, -1051523);
		b = ii(b, c, d, a, k[1], 21, -2054922799);
		a = ii(a, b, c, d, k[8], 6,  1873313359);
		d = ii(d, a, b, c, k[15], 10, -30611744);
		c = ii(c, d, a, b, k[6], 15, -1560198380);
		b = ii(b, c, d, a, k[13], 21,  1309151649);
		a = ii(a, b, c, d, k[4], 6, -145523070);
		d = ii(d, a, b, c, k[11], 10, -1120210379);
		c = ii(c, d, a, b, k[2], 15,  718787259);
		b = ii(b, c, d, a, k[9], 21, -343485551);

		x[0] = add32(a, x[0]);
		x[1] = add32(b, x[1]);
		x[2] = add32(c, x[2]);
		x[3] = add32(d, x[3]);
	}

	function cmn(q, a, b, x, s, t) {
		a = add32(add32(a, q), add32(x, t));
		return add32((a << s) | (a >>> (32 - s)), b);
	}

	function ff(a, b, c, d, x, s, t) {
		return cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function gg(a, b, c, d, x, s, t) {
		return cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function hh(a, b, c, d, x, s, t) {
		return cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function ii(a, b, c, d, x, s, t) {
		return cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function md51(s) {
		var txt = '';
		var n = s.length,
		state = [1732584193, -271733879, -1732584194, 271733878], i;
		for (i=64; i<=s.length; i+=64) {
			md5cycle(state, md5blk(s.substring(i-64, i)));
		}
		s = s.substring(i-64);
		var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
		for (i=0; i<s.length; i++)
			tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
		tail[i>>2] |= 0x80 << ((i%4) << 3);
		if (i > 55) {
			md5cycle(state, tail);
			for (i=0; i<16; i++) tail[i] = 0;
		}
		tail[14] = n*8;
		md5cycle(state, tail);
		return state;
	}

	/* there needs to be support for Unicode here,
	 * unless we pretend that we can redefine the MD-5
	 * algorithm for multi-byte characters (perhaps
	 * by adding every four 16-bit characters and
	 * shortening the sum to 32 bits). Otherwise
	 * I suggest performing MD-5 as if every character
	 * was two bytes--e.g., 0040 0025 = @%--but then
	 * how will an ordinary MD-5 sum be matched?
	 * There is no way to standardize text to something
	 * like UTF-8 before transformation; speed cost is
	 * utterly prohibitive. The JavaScript standard
	 * itself needs to look at this: it should start
	 * providing access to strings as preformed UTF-8
	 * 8-bit unsigned value arrays.
	 */
	function md5blk(s) { /* I figured global was faster.   */
		var md5blks = [], i; /* Andy King said do it this way. */
		for (i=0; i<64; i+=4) {
			md5blks[i>>2] = s.charCodeAt(i)
			+ (s.charCodeAt(i+1) << 8)
			+ (s.charCodeAt(i+2) << 16)
			+ (s.charCodeAt(i+3) << 24);
		}
		return md5blks;
	}

	var hex_chr = '0123456789abcdef'.split('');

	function rhex(n)
	{
		var s='', j=0;
		for(; j<4; j++)
			s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
				+ hex_chr[(n >> (j * 8)) & 0x0F];
		return s;
	}

	function hex(x) {
		for (var i=0; i<x.length; i++)
			x[i] = rhex(x[i]);
		return x.join('');
	}

	var md5 = function(s) {
		return hex(md51(s));
	}

	/* this function is much faster,
	so if possible we use it. Some IEs
	are the only ones I know of that
	need the idiotic second function,
	generated by an if clause.  */

	function add32(a, b) {
		return (a + b) & 0xFFFFFFFF;
	}

	if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
		function add32(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF),
			msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}
	}
	var toTIS620 = function (s) {
		var len = s.length;
		var out = [];
		for (var i = 0; i < len; i++) {
			var code = s.charCodeAt(i);
			if (code >= 3585 && code <= 3679) {
				code -= 3585 - 161;
			}
			out.push(String.fromCharCode(code));
		}
		return out.join('');
	}
	var toByteArray = function(s) {
		var len = s.length;
		var out = [];
		for (var i = 0; i < len; i++) {
			var code = s.charCodeAt(i);
			//console.log(s.charCodeAt(i));
			if (code >= 3585 && code <= 3679) {
				code -= 3585 - 161;
				//console.log(code, String.fromCharCode(code));
			}
			out.push(code);
		}
		return out;
	}
	var thSplit = function(s, limit) {
		var text = s.replace(/^\s+/, '');
		text = text.replace(/\s+$/, '');
		text = text.replace(/\s+/g, ' ');
		var num_char= 0;
		var last = 0;
		var len = text.length;
		for (var i = 0; i < len; i++) {
			var ch = text.charCodeAt(i);
			if (ch==0xe31
				|| ch >= 0xe34 && ch <= 0xe3a
				|| ch >= 0xe47 && ch <= 0xe4e) {
				continue;
			}
			if (ch==32) {
				last = i;
			}
			num_char++;
			if (num_char > limit) {
				break;
			}
		}
		var out = [];
		if (num_char > limit) {
			out.push(text.substr(0,last));
			[].push.apply(out, thSplit(text.substr(last+1), limit));
		} else {
			out.push(text);
		}
		return out;
	}
	var thDate = function(d) {
		var tmp = d.substr(0,10).split('-');
		if (tmp.length != 3) {
			return d;
		}
		if (tmp[0]=='0000') {
			return '';
		}
		var yy = parseInt(tmp[0]) + 543;
		return tmp[2] + '/' + tmp[1] + '/' + yy;
	}

	var formatNumber = function(number, digit, padSize) {
		var s='', old='', out='';

		number = parseFloat(number);
		s = ''+number.toFixed(isNaN(digit) ? 2 : digit);
		old = out = s;

		while ((out=out.replace(/(\d+)(\d{3})/g, '$1,$2')) != old) {
		  old = out;
		}

		if (padSize) {
			return ('               ' + out).substr(-padSize);
		}
		return out;
	}

	var bahtText = function(n) {
	 	var text = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
	  var unit = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน'];
	  n = parseFloat(n);
	  var num = n.toFixed(2);

	  var numText = function(s) {
	    var out = '';
	    var j = 0;
	    for (var i = s.length-1; i >= 0; i--) {
	      var num = parseInt(s.substr(i, 1));
	      var t = text[num];
	      var u = unit[j];
	      if (num==1 && j==1) {
	        t = '';
	      } else if(num==1 && j==0 && s.length > 1) {
	        t = 'เอ็ด';
	      } else if (num==2 && j==1) {
	        t = 'ยี่';
	      } else if (num==0) {
	        u = '';
	      }
	      out =  t + u + out;
	      j++;
	    }
	    return out;
	  }
	  var tmp = num.split('.');
	  var out = '';

	  var t = tmp[0];
	  while (t != '') {
	    if (t.length <= 6) {
	      out = numText(t) + out;
	      t = '';
	      break;
	    } else {
	      out = numText(t.substr(t.length-6, 6)) + out;
	      t = t.substr(0, t.length-6);
	    }
	    if (t != '') {
	      out = 'ล้าน' + out;
	    }
	  }
	  out += 'บาท';
	  if (parseInt(tmp[1]) > 0) {
	    out += numText(tmp[1]) + 'สตางค์';
	  } else {
	    out += 'ถ้วน';
	  }
	  return out;
	}
    
    var numberToEnglish = function( n ) {

    var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';

    /* Is number zero? */
    if( parseInt( string ) === 0 ) {
        return 'zero';
    }

    /* Array of units as words */
    units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];

    /* Array of tens as words */
    tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

    /* Array of scales as words */
    scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while( start > 0 ) {
        end = start;
        chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if( chunksLen > scales.length ) {
        return '';
    }

    /* Stringify each integer in each chunk */
    words = [];
    for( i = 0; i < chunksLen; i++ ) {

        chunk = parseInt( chunks[i] );

        if( chunk ) {

            /* Split chunk into array of individual integers */
            ints = chunks[i].split( '' ).reverse().map( parseFloat );

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if( ints[1] === 1 ) {
                ints[0] += 10;
            }

            /* Add scale word if chunk is not zero and array item exists */
            if( ( word = scales[i] ) ) {
                words.push( word );
            }

            /* Add unit word if array item exists */
            if( ( word = units[ ints[0] ] ) ) {
                words.push( word );
            }

            /* Add tens word if array item exists */
            if( ( word = tens[ ints[1] ] ) ) {
                words.push( word );
            }

            /* Add 'and' string after units or tens integer if: */
            if( ints[0] || ints[1] ) {

                /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                if( ints[2] || ! i && chunksLen ) {
                    words.push( and );
                }

            }

            /* Add hundreds word if array item exists */
            if( ( word = units[ ints[2] ] ) ) {
                words.push( word + ' hundred' );
            }

        }

    }

    return words.reverse().join( ' ' );

}

	var dateAdd = function(date, ms) {
		var d = new Date(date);
		var d2 = new Date(d.getTime() + ms);
    return d2.getFullYear() + '-'
      + ('00' + (d2.getMonth()+1)).substr(-2) + '-'
      + ('00' + d2.getDate()).substr(-2) + ' '
      + ('00' + d2.getHours()).substr(-2) + ':'
      + ('00' + d2.getMinutes()).substr(-2) + ':'
      + ('00' + d2.getSeconds()).substr(-2);
//		return $filter('date')(d2, 'yyyy-MM-dd HH:mm:ss');
	}

// var thShortDate = function(date) {
// 	var d = date.substr(0, 15).split('-');
// 	var th = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'
// 			, 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
// 	return parseInt(d[2]) + ' ' + th[parseInt(d[1])] + ' ' + (parseInt(d[0])+543);
// }
var thShortDate = function(date) {
	if (typeof date.getFullYear === 'function') {
		date = dateToString(date);
	}
	var d = date.substr(0, 10).split('-');
	if (d[0]=='0000') {
		return date.substr(0, 10);
	}
	var th = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'
			, 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
	return parseInt(d[2]) + ' ' + th[parseInt(d[1])] + ' ' + (parseInt(d[0])+543);
}

var thShortDateTime = function(date) {
	if (typeof date.getFullYear === 'function') {
		date = dateTimeToString(date);
	}
	return thShortDate(date) + ' ' + date.substr(11,5);
}

var getCookie = function (name, defaultValue) {
  // var value = "; " + document.cookie;
  // var parts = value.split("; " + name + "=");
  // if (parts.length == 2) {
  //   return parts.pop().split(";").shift();
  // }
  // return defaultValue;
	var value = window.localStorage.getItem(name);
	if (value===null) {
		return defaultValue;
	}
	return value;
}
var setCookie = function (name, value) {
	/*
	if (!expiry) {
  	window.document.cookie = name + '=' + value;
	} else {
		window.document.cookie = name + '=' + value + '; max-age=' + expiry;
	}
	*/
	// permanent = !!permanent;
	var storage;
	// if (permanent) {
	storage = window.localStorage;
	// } else {
	// 	storage = window.sessionStorage;
	// }
	if (typeof value === 'object') {
		value = JSON.stringify(value);
	};
	storage.setItem(name, value);
}
var clone = function(obj) {
	return JSON.parse(JSON.stringify(obj));
}

var numberFormat = function(number, n, s, c) {
	if (typeof number != 'number') {
		return number;
	}
    var re = '\\d(?=(\\d{3})+' + (n > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

var escape = function(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

var toDate = function(text) {
	if (!text) {
		return null;
	}
  var m = text.split(/[-\/]/);
//  console.log('date', m);
  var n = m.map(function(s) {
    return parseInt(s);
  });
  if (isNaN(n[0]) || isNaN(n[1]) || isNaN(n[2])
		|| n[0]<=0 || n[1]<=0 || n[2]<=0 || n[1]>12) {
    return null;
  }
  if (n[0] >= 1900) {
    n[0] -= (n[0] >= 2400 ? 543 : 0);
    return new Date(n[0], n[1]-1, n[2]);
  }
  n[2] -= (n[2]>=2400 ? 543 : 0);
  return new Date(n[2], n[1]-1, n[0]);
}

var parseDateRange = function(s) {
	var pattern = /^(\d+[-\/]\d+[-\/]\d+)(?:\s+(?:-\s+)?(\d+[-\/]\d+[-\/]\d+))?$/;
	var m = pattern.exec(s);
	if (m==null) {
		return null;
	}
	var d1 = toDate(m[1]);
	var d2 = toDate(m[2]);
	if (d1==null && d2==null) {
		return null;
	}
	if (d1==null) {
		return [d2, null];
	}
	if (d2==null) {
		return [d1, null];
	}
	if (d2 < d1) {
		return [d2, d1];
	}
	return [d1, d2];
}
var genCond = function(field, keyword, isOracle) {
	keyword = keyword.trim();
	if (keyword=='') {
		return '';
	}
	if (field.type=='date') {
		// var tmp = keyword.split(/\s+/);
		// if (tmp.length == 2) {
		// 	return field.name + " BETWEEN '" + tmp[0] + "' AND '" + tmp[1] + "'";
		// }
//    return field.name + " LIKE '" + keyword.substr(0, 10) + "%'";
		if (isOracle) {
			return field.name + " BETWEEN TO_DATE('" + keyword.substr(0, 10) + "', 'YYYY-MM-DD') AND TO_DATE('" +keyword.substr(0, 10)+" 23:59:59', 'YYYY-MM-DD HH24:MI:SS')";
		}
		return field.name + " BETWEEN '" + keyword.substr(0, 10) + "' AND '" +keyword.substr(0, 10)+" 23:59:59'";
	}
	if (field.type=='daterange') {
		if (/%/.test(keyword)) {
			if (/^[\d%]{1,4}[-\/][\d%]{1,2}[-\/][\d%]{1,4}$/.test(keyword)) {
				var tmp = keyword.split(/[-\/]/);
				var num = tmp.map(function(t) {
					return parseInt(t);
				});
				var out = [];
				if (!isNaN(num[0]) && num[0] >= 1900) {
					out.push(''+num[0]);
					out.push(isNaN(num[1]) ? tmp[1] : ('0'+num[1]).substr(-2));
					out.push(isNaN(num[2]) ? tmp[2] : ('0'+num[2]).substr(-2));
				} else {
					out.push(''+num[2]);
					out.push(isNaN(num[1]) ? tmp[1] : ('0'+num[1]).substr(-2));
					out.push(isNaN(num[0]) ? tmp[0] : ('0'+num[0]).substr(-2));
				}
				if (isOracle) {
					return "TO_CHAR(" + field.name + ", 'YYYY-MM-DD') LIKE '" + out.join('-') + "'";
				}
				return "CONCAT(''," + field.name + ") LIKE '" + out.join('-') + "%'";
			} else {
				return '';
			}
		} else {
			var tmp = parseDateRange(keyword);
			if (tmp==null || tmp[0]==null) {
				return '';
			}
			if (isOracle) {
				if (tmp[1]==null) {
					return field.name + " BETWEEN TO_DATE('" + dateToString(tmp[0]) + "', 'YYYY-MM-DD') AND TO_DATE('" + dateToString(tmp[0]) + " 23:59:59', 'YYYY-MM-DD HH24:MI:SS')";
				} else {
					return field.name + " BETWEEN TO_DATE('" + dateToString(tmp[0]) + "', 'YYYY-MM-DD') AND TO_DATE('" + dateToString(tmp[1]) + " 23:59:59', 'YYYY-MM-DD HH24:MI:SS')";
				}
			}
			if (tmp[1]==null) {
				return field.name + " BETWEEN '" + dateToString(tmp[0]) + "' AND '"
					+ dateToString(tmp[0]) + " 23:59:59'";
			} else {
				return field.name + " BETWEEN '" + dateToString(tmp[0]) + "' AND '"
					+ dateToString(tmp[1]) + " 23:59:59'";
			}
		}
	}
	if (/%/.test(keyword)) {
		return field.name + " LIKE '" + keyword + "'";
	}
  if (field.type=='number') {
    var pattern = /(>|<|>=|<=|=|<>|!=)?\s*(\d+(?:\.\d+)?)/g;
    var out = [];
    var num;
    while (match = pattern.exec(keyword)) {
      num = parseFloat(match[2]);
      if (isNaN(num)){
        continue;
      }
      if (!!!match[1]) {
        match[1]='=';
      }
      out.push({op:match[1]=='!='?'<>':match[1], value:match[2]});
    }
    if (out.length==0) {
      return '';
    }
    if (out.length == 2 && out[0].op=='=' && out[1].op=='=') {
      // between
      return field.name + ' BETWEEN ' + out[0].value + ' AND ' + out[1].value;
    }
    var tmp = out.map(function(item) {
      return field.name+item.op+item.value;
    });
    return tmp.join(' AND ');
  }
  return field.name + "='"+escape(keyword)+"'";
}

var gridOpt = function(db, mainQuery, body, ext, isOracle){
	var $result = {};
	isOracle = isOracle || false;

	ext.fields = ext.fields || {};

    var cond = [];
	for(var fld in body.keywords) {

      var keyword = body.keywords[fld];
      if (typeof keyword === 'undefined') continue;
      keyword = keyword.trim();
      if (keyword == '') continue;
      if (typeof ext.fields[fld]==='undefined') continue;

      var tmp = genCond(ext.fields[fld], keyword, isOracle);
      if (tmp==='') continue;
      cond.push(tmp);
    }

    var sortBy = body.sortBy || ext.sortBy || 'id';
    var sortDir = body.sortDir || ext.sortDir || 'ASC';
    var limit = body.limit || ext.limit || 50;
    var page = body.page || ext.page || 0;

    $result.rows = mainQuery;
    $result.opt = {
      sortBy: sortBy,
      sortDir: sortDir,
      limit: limit,
      page: page,
      totalRows: 'SELECT COUNT(*) AS cnt FROM (' + mainQuery + ') x ',
    };

	if(!isOracle) {
    	sortBy = '`' + sortBy + '`';
		mainQuery += ' AND ' + cond.join(' AND ');
    	$result.sql = mainQuery + ' ORDER BY ' + sortBy + ' ' + sortDir;
    	$result.sql +=  ' LIMIT ' + (page * limit) + ', ' + limit;
	}

	var dfd = q.defer();
    q.all([
      (function(){
        return db.query($result.rows, {}).then(function(rows) {
          $result.rows = rows;
        });
      })(),
      (function(){
        return db.query($result.opt.totalRows, {}).then(function(rows) {
          $result.opt.totalRows = rows[0].cnt;
        });
      })(),
    ]).then(function(){
    	dfd.resolve({ status:true, data: $result.rows, opt: $result.opt });
    }).catch(function(e) {
    	dfd.reject({ status:false, error: e });
    });

	return dfd.promise;
}

var dateToString = function(d, d2) {
	if (!d || typeof d.getFullYear != 'function') {
		return d2 || '0000-00-00';
	}
	return d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).substr(-2)
		+ '-' + ('0' + d.getDate()).substr(-2);
}

var dateTimeToString = function(d, d2) {
	if (!d || typeof d.getFullYear != 'function') {
		return d2 || '0000-00-00';
	}
	return d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).substr(-2)
		+ '-' + ('0' + d.getDate()).substr(-2)
		+ ' ' + ('0' + d.getHours()).substr(-2)
		+ ':' + ('0' + d.getMinutes()).substr(-2)
		+ ':' + ('0' + d.getSeconds()).substr(-2);
}

var formatNationID = function(s) {
	if (!s) {
		return '';
	}
	if (s.length != 13) {
		return s;
	}
	return s.substr(0,1) + '-' + s.substr(1,4) + '-' + s.substr(5,5) + '-' + s.substr(10,2) + '-' + s.substr(12,1);
}

var toNumber = function(s, n) {
	if (typeof s==='number') {
		return s;
	}
	var num = 0;
	if (typeof s==='string') {
		s = s.replace(/[^\d\.]/mig, '');
		num = parseFloat(s);
	}
	if (isNaN(num)) {
		if (typeof n == 'number') {
			return n;
		} else {
			return 0;
		}
	}
	return num;
}

var toMoney = function(val, c) {
	c = c > -1 ? c : 2;
	var n = val;
	if(typeof val != 'number') {
		var f = n != undefined ? parseFloat(parseFloat(n.replace(/,/g, '')).toFixed(c)) : 0; n (!isNaN(f)) ? f : 0;
	}
	console.log('point', c);
  var d = ".", t = ",", s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c>0 ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
module.exports = {
	newUUID: newUUID,
	md5: md5,
	toTIS620: toTIS620,
	thSplit: thSplit,
	thDate: thDate,
	thShortDate: thShortDate,
	thShortDateTime: thShortDateTime,
	numberFormat: numberFormat,
	formatNumber: formatNumber,
	bahtText: bahtText,
  numberToEnglish: numberToEnglish,
	dateAdd: dateAdd,
  getCookie: getCookie,
  setCookie: setCookie,
	clone: clone,
	genCond: genCond,
	gridOpt: gridOpt,
	dateToString: dateToString,
	dateTimeToString: dateTimeToString,
	formatNationID: formatNationID,
	toNumber: toNumber,
	toMoney: toMoney
}
