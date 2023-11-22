import moment from "moment";

export const JsDatetimeToSQLDate = (_datetime) => {
  try {
    var startDay =("0" + (_datetime.getDate())).slice(-2)
    var startMonth =("0" + (_datetime.getMonth()+1)).slice(-2)
    var startYear = _datetime.getFullYear();
    var startDate =startYear + "-"+ startMonth + "-"  + startDay;
    return startDate;
  } catch (error) {
    return ''
  }
    
}

export const ISO8601toDateTimeConverter = (_datetime) => {
  var datetime = new Date(_datetime);
  var time=datetime.toLocaleString('en-US', {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return time;
}

export const ISO8601toDateConverter = (_datetime) => {
  var datetime = new Date(_datetime);
  var time=datetime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',

  });
  return time;
}