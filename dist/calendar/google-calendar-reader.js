"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const credentials = require("../../resources/credentials.json");
const token = require("./token.json");
// listEvents((err: any, res: any) => {
//   if (err) {
//     console.log("The API returned an error: " + err);
//     return;
//   }
//   const events = res.data.items;
//   if (events.length) {
//     console.log("tomorrow:");
//     events.map((event: any) => {
//       const start = event.start.dateTime || event.start.date;
//       calendarEvents.push(`${start} - ${event.summary}`);
//     });
//     console.log(calendarEvents);
//   } else {
//     console.log("No upcoming events found.");
//   }
// });
class GoogleCalendar {
    listEvents(callbackMethod) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials(token);
        const calendar = googleapis_1.google.calendar({ version: "v3", oAuth2Client });
        let calendarsIds = [];
        calendar.calendarList.list({}, (err, res) => {
            if (err)
                return console.log("The API returned an error: " + err);
            const calendars = res.data.items;
            if (calendars.length) {
                console.log("calendars:");
                calendars.map((calendar, i) => {
                    calendarsIds.push(calendar.id);
                });
                for (let i = 0; i < calendarsIds.length; i++) {
                    calendar.events.list({
                        calendarId: encodeURIComponent(calendarsIds[i]),
                        timeMin: new Date().toISOString(),
                        timeMax: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                        singleEvents: true,
                        orderBy: "startTime"
                    }, callbackMethod);
                }
            }
            else {
                console.log("No upcoming events found.");
            }
        });
    }
}
exports.GoogleCalendar = GoogleCalendar;
//# sourceMappingURL=google-calendar-reader.js.map