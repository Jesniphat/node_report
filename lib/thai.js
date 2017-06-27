
// Lower level characters
var SARA_U = '\u0E38';
var SARA_UU = '\u0E39';
var PHINTHU = '\u0E3A';

// Lower level characters after pullDown
var SARA_U_DOWN = '\uF718';
var SARA_UU_DOWN = '\uF719';
var PHINTHU_DOWN = '\uF71A';

// Upper level 1 characters
var MAI_HAN_AKAT = '\u0E31';
var SARA_AM = '\u0E33';
var SARA_I = '\u0E34';
var SARA_II = '\u0E35';
var SARA_UE = '\u0E36';
var SARA_UEE = '\u0E37';
var MAI_TAI_KHU = '\u0E47';

// Upper level 1 characters after shift left
var MAI_HAN_AKAT_LEFT_SHIFT = '\uF710';
var SARA_I_LEFT_SHIFT = '\uF701';
var SARA_II_LEFT_SHIFT = '\uF702';
var SARA_UE_LEFT_SHIFT = '\uF703';
var SARA_UEE_LEFT_SHIFT = '\uF704';
var MAI_TAI_KHU_LEFT_SHIFT = '\uF712';

// Upper level 2 characters
var MAI_EK = '\u0E48';
var MAI_THO = '\u0E49';
var MAI_TRI = '\u0E4A';
var MAI_CHATTAWA = '\u0E4B';
var THANTHAKHAT = '\u0E4C';
var NIKHAHIT = '\u0E4D';

// Upper level 2 characters after pull down
var MAI_EK_DOWN = '\uF70A';
var MAI_THO_DOWN = '\uF70B';
var MAI_TRI_DOWN = '\uF70C';
var MAI_CHATTAWA_DOWN = '\uF70D';
var THANTHAKHAT_DOWN = '\uF70E';

// Upper level 2 characters after pull down and shift left
var MAI_EK_PULL_DOWN_AND_LEFT_SHIFT = '\uF705';
var MAI_THO_PULL_DOWN_AND_LEFT_SHIFT = '\uF706';
var MAI_TRI_PULL_DOWN_AND_LEFT_SHIFT = '\uF707';
var MAI_CHATTAWA_PULL_DOWN_AND_LEFT_SHIFT = '\uF708';
var THANTHAKHAT_PULL_DOWN_AND_LEFT_SHIFT = '\uF709';

// Upper level 2 characters after shift left
var MAI_EK_LEFT_SHIFT = '\uF713';
var MAI_THO_LEFT_SHIFT = '\uF714';
var MAI_TRI_LEFT_SHIFT = '\uF715';
var MAI_CHATTAWA_LEFT_SHIFT = '\uF716';
var THANTHAKHAT_LEFT_SHIFT = '\uF717';
var NIKHAHIT_LEFT_SHIFT = '\uF711';

// Up tail characters
var PO_PLA = '\u0E1B';
var FO_FA = '\u0E1D';
var FO_FAN = '\u0E1F';
var LO_CHULA = '\u0E2C';

// Down tail characters
var THO_THAN = '\u0E10';
var YO_YING = '\u0E0D';
var DO_CHADA = '\u0E0E';
var TO_PATAK = '\u0E0F';
var RU = '\u0E24';
var LU = '\u0E26';

// Cut tail characters
var THO_THAN_CUT_TAIL = '\uF700';
var YO_YING_CUT_TAIL = '\uF70F';

// for exploded SARA_AM (NIKHAHIT + SARA_AA)
var SARA_AA = '\u0E32';

var countSaraAm = function(content) {
  var count = 0;
  for (var i = 0; i < content.length; i++) {
    if (content[i] == SARA_AM) {
      count++;
    }
  }
  return count;
}

var explodeSaraAm = function(content) {
  var count = countSaraAm(content);
  if (count == 0) {
    return content;
  }

  var newContent = [];
  var j = 0;
  var len = content.length;
  for (var i = 0; i < content.length; i++) {
    var ch = content.charAt(i);
    if (i < len - 1 && content.charAt(i+1) == SARA_AM) {
      if (isUpperLevel2(ch)) {
        newContent.push(NIKHAHIT);
        newContent.push(ch);
      } else {
        newContent.push(ch);
        newContent.push(NIKHAHIT);
      }
    } else if (ch == SARA_AM) {
      newContent.push(SARA_AA);
    } else {
      newContent.push(ch);
    }
  }

  return newContent.join('');
}

var isUpTail = function(ch) {
  return ch == PO_PLA || ch == FO_FA || ch == FO_FAN || ch == LO_CHULA;
}

var isDownTail = function(ch) {
  return ch == THO_THAN || ch == YO_YING || ch == DO_CHADA
      || ch == TO_PATAK || ch == RU || ch == LU;
}

var isUpperLevel1 = function(ch) {
  return ch == MAI_HAN_AKAT || ch == SARA_I || ch == SARA_II
      || ch == SARA_UE || ch == SARA_UEE || ch == MAI_TAI_KHU
      || ch == NIKHAHIT;
}

var isLeftShiftUpperLevel1 = function(ch) {
  return ch == MAI_HAN_AKAT_LEFT_SHIFT || ch == SARA_I_LEFT_SHIFT || ch == SARA_II_LEFT_SHIFT
    || ch == SARA_UE_LEFT_SHIFT || ch == SARA_UEE_LEFT_SHIFT || ch == MAI_TAI_KHU_LEFT_SHIFT
    || ch == NIKHAHIT_LEFT_SHIFT;
}


var isUpperLevel2 = function(ch) {
  return ch == MAI_EK     || ch == MAI_THO || ch == MAI_TRI
    || ch == MAI_CHATTAWA || ch == THANTHAKHAT;
}

var isLowerLevel = function(ch) {
  return ch == SARA_U || ch == SARA_UU || ch == PHINTHU;
}

var pullDownAndShiftLeft = function(ch) {
  switch (ch) {
  case MAI_EK:
    return MAI_EK_PULL_DOWN_AND_LEFT_SHIFT;
  case MAI_THO:
    return MAI_THO_PULL_DOWN_AND_LEFT_SHIFT;
  case MAI_TRI:
    return MAI_TRI_PULL_DOWN_AND_LEFT_SHIFT;
  case MAI_CHATTAWA:
    return MAI_CHATTAWA_PULL_DOWN_AND_LEFT_SHIFT;
  case MAI_HAN_AKAT:
    return MAI_HAN_AKAT_LEFT_SHIFT;
  case THANTHAKHAT:
    return THANTHAKHAT_PULL_DOWN_AND_LEFT_SHIFT;
  default:
    return ch;
  }
}

var shiftLeft = function(ch) {
  switch (ch) {
    case MAI_EK:
      return MAI_EK_LEFT_SHIFT;
    case MAI_THO:
      return MAI_THO_LEFT_SHIFT;
    case MAI_TRI:
      return MAI_TRI_LEFT_SHIFT;
    case MAI_CHATTAWA:
      return MAI_CHATTAWA_LEFT_SHIFT;
    case MAI_HAN_AKAT:
      return MAI_HAN_AKAT_LEFT_SHIFT;
    case SARA_I:
      return SARA_I_LEFT_SHIFT;
    case SARA_II:
      return SARA_II_LEFT_SHIFT;
    case SARA_UE:
      return SARA_UE_LEFT_SHIFT;
    case SARA_UEE:
      return SARA_UEE_LEFT_SHIFT;
    case MAI_TAI_KHU:
      return MAI_TAI_KHU_LEFT_SHIFT;
    case NIKHAHIT:
      return NIKHAHIT_LEFT_SHIFT;
    default:
      return ch;
  }
}

var pullDown = function(ch) {
  switch (ch) {
    case MAI_EK:
      return MAI_EK_DOWN;
    case MAI_THO:
      return MAI_THO_DOWN;
    case MAI_TRI:
      return MAI_TRI_DOWN;
    case MAI_CHATTAWA:
      return MAI_CHATTAWA_DOWN;
    case THANTHAKHAT:
      return THANTHAKHAT_DOWN;
    case SARA_U:
      return SARA_U_DOWN;
    case SARA_UU:
      return SARA_UU_DOWN;
    case PHINTHU:
      return PHINTHU_DOWN;
    default:
      return ch;
  }
}

var cutTail = function(ch) {
  switch(ch) {
    case THO_THAN:
      return THO_THAN_CUT_TAIL;
    case YO_YING:
      return YO_YING_CUT_TAIL;
    default:
      return ch;
  }
}

var thai = function(content) {
  var out = [];
  var length = 0;
  var pch = 'a'; //previous character start with dummy value

  content = explodeSaraAm(content);
  length = content.length;

  // Replace upper and lower character with un-overlapped character
  for (var i = 0; i < length; i++) {
    var ch = content.charAt(i);
    // if (typeof usedGlyphs[ch]==='undefined') {
    //   usedGlyphs[ch] = 1;
    //   usedGlyphs.cnt++;
    // }
//    console.log('ch=', ch.charCodeAt(0), ', pch=', pch.charCodeAt(0));

    if (isUpperLevel1(ch) && isUpTail(pch)) { // Level 1 and up-tail
      out.push(shiftLeft(ch));
    } else if (isUpperLevel2(ch)) {
      // Level 2
      if (isLowerLevel(pch)) {
        pch = content[i-2];
      }

      if (isUpTail(pch)) {
        out.push(pullDownAndShiftLeft(ch));
      } else if (isLeftShiftUpperLevel1(pch)) {
        out.push(shiftLeft(ch));
      } else if (!isUpperLevel1(pch)) {
        out.push(pullDown(ch));
      } else {
        out.push(ch);
      }
    } else if (isLowerLevel(ch) && isDownTail(pch)) { // Lower level and down-tail
      var cutch = cutTail(pch);
      if (pch != cutch) {
        out[out.length-1] = cutch;
      } else {
        out.push(pullDown(ch));
      }
    } else {
      out.push(ch);
    }
    pch = content[i];
  }
  return out.join('');
}

var th = function(s) {
  return s.replace(/([\u0e48\u0e49\u0e4a\u0e4b])\u0e33/g, '\u0e4d$1\u0e32')
}

module.exports = thai;
