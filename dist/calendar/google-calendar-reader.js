"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const credentials = require("../../resources/credentials.json");
const token = require("./token.json");
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
oAuth2Client.setCredentials((token));
listEvents(oAuth2Client);
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
    const calendar = googleapis_1.google.calendar({ version: "v3", auth });
    let calendarsIds = [];
    let calendarEvents = [];
    calendar.calendarList.list({}, (err, res) => {
        if (err)
            return console.log('The API returned an error: ' + err);
        const calendars = res.data.items;
        if (calendars.length) {
            console.log('calendars:');
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
                }, (err, res) => {
                    if (err)
                        return console.log("The API returned an error: " + err);
                    const events = res.data.items;
                    if (events.length) {
                        console.log("tomorrow:");
                        events.map((event) => {
                            const start = event.start.dateTime || event.start.date;
                            calendarEvents.push(`${start} - ${event.summary}`);
                        });
                    }
                    else {
                        console.log("No upcoming events found.");
                    }
                });
            }
        }
        else {
            console.log('No upcoming events found.');
        }
    });
}
//# sourceMappingURL=google-calendar-reader.js.map