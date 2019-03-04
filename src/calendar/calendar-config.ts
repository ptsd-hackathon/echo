const KEY = require('../../resources/ptsd-echo-0d9a8def6078.json').private_key;
const SERVICE_ACCT_ID = 'ptsd-echo@ptsd-echo.iam.gserviceaccount.com';
const CALENDAR_ID = ['ptsd.echo@gmail.com',
  encodeURIComponent('iw.jewish#holiday@group.v.calendar.google.com'),
  encodeURIComponent('iw.islamic#holiday@group.v.calendar.google.com'),
  encodeURIComponent('iw.christian#holiday@group.v.calendar.google.com')
];
const TIMEZONE = 'UTC+02:00';
 
module.exports.key = KEY;           //or if using json keys - module.exports.key = key; 
module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.calendarId = CALENDAR_ID;
module.exports.timezone = TIMEZONE;