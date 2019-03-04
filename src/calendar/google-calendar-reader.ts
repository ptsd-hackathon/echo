// import { google } from "googleapis";
const CONFIG = require("./calendar-config");
const NodeGoogleCalendar = require("node-google-calendar");
let CalendarAPI = new NodeGoogleCalendar(CONFIG);

// const credentials = require("../../resources/credentials.json");
// const token = require("./token.json");

// // listEvents((err: any, res: any) => {
// //   if (err) {
// //     console.log("The API returned an error: " + err);
// //     return;
// //   }
// //   const events = res.data.items;
// //   if (events.length) {
// //     console.log("tomorrow:");
// //     events.map((event: any) => {
// //       const start = event.start.dateTime || event.start.date;
// //       calendarEvents.push(`${start} - ${event.summary}`);
// //     });
// //     console.log(calendarEvents);
// //   } else {
// //     console.log("No upcoming events found.");
// //   }
// // });

// export class GoogleCalendar {
//   listEvents(callbackMethod: any): void {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(
//       client_id,
//       client_secret,
//       redirect_uris[0]
//     );

//     oAuth2Client.setCredentials(token);
//     const calendar = google.calendar({ version: "v3", oAuth2Client });
//     let calendarsIds: string[] = [];
//     calendar.calendarList.list({}, (err: any, res: any) => {
//       if (err) return console.log("The API returned an error: " + err);
//       const calendars = res.data.items;
//       if (calendars.length) {
//         console.log("calendars:");
//         calendars.map((calendar: any, i: any) => {
//           calendarsIds.push(calendar.id);
//         });

//         for (let i = 0; i < calendarsIds.length; i++) {
//           calendar.events.list(
//             {
//               calendarId: encodeURIComponent(calendarsIds[i]),
//               timeMin: new Date().toISOString(),
//               timeMax: new Date(
//                 new Date().setDate(new Date().getDate() + 1)
//               ).toISOString(),
//               singleEvents: true,
//               orderBy: "startTime"
//             },
//             callbackMethod
//           );
//         }
//       } else {
//         console.log("No upcoming events found.");
//       }
//     });
//   }
// }

let nextDayEventsParams = {
  timeMin: new Date().toISOString(),
  timeMax: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  singleEvents: true,
  orderBy: "startTime"
};

export function getCriticalEvents() {
  var promises: any[] = [];
  CONFIG.calendarId.forEach((calendar: any) => {
    promises.push(CalendarAPI.Events.list(calendar, nextDayEventsParams));
  });
  return promises;
}

// .then((json: any) => {
//     console.log(json);
//     poop.push(json.getivents in json);
//   })
//   .catch((err: any) => {
//     console.log(err);
//   });
