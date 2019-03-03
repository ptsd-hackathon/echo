import { GoogleCalendar } from "./google-calendar-reader";

function startCheckingForEvents() {
  let calendarEvents: String[] = [];
  let callback = (err: any, res: any) => {
    if (err) {
      console.log("The API returned an error: " + err);
      return;
    }
    const events = res.data.items;
    if (events.length) {
      console.log("tomorrow:");
      events.map((event: any) => {
        const start = event.start.dateTime || event.start.date;
        calendarEvents.push(`${start} - ${event.summary}`);
      });
      console.log(calendarEvents);
    } else {
      console.log("No upcoming events found.");
    }
  };
  new GoogleCalendar().listEvents(callback);
}

setInterval(startCheckingForEvents, 1000);