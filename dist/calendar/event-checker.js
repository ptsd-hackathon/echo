"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_calendar_reader_1 = require("./google-calendar-reader");
function startCheckingForEvents() {
    let calendarEvents = [];
    let callback = (err, res) => {
        if (err) {
            console.log("The API returned an error: " + err);
            return;
        }
        const events = res.data.items;
        if (events.length) {
            console.log("tomorrow:");
            events.map((event) => {
                const start = event.start.dateTime || event.start.date;
                calendarEvents.push(`${start} - ${event.summary}`);
            });
            console.log(calendarEvents);
        }
        else {
            console.log("No upcoming events found.");
        }
    };
    new google_calendar_reader_1.GoogleCalendar().listEvents(callback);
}
setInterval(startCheckingForEvents, 1000);
//# sourceMappingURL=event-checker.js.map