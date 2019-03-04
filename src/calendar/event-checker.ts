// import { GoogleCalendar } from "./google-calendar-reader";
import { getCriticalEvents } from "./google-calendar-reader";

function startCheckingForEvents() {
  let criticEve = getCriticalEvents();
  let eventsToSend: any[] = [];
  criticEve.forEach(eve => {
    eve.then((x: any) => {
      
    for (let index = 0; index < x.length; index++) {
      const event = x[index];
      let eventData;
      if (event.creator.email == "ptsd.echo@gmail.com") {
         eventData = {
          "eventName": event.summary,
          "eventType": "אישיים",
          "startDate": event.start.dateTime,
          "endDate": event.end.dateTime
        }
      } else {
         eventData = {
          "eventName": event.summary,
          "eventType": event.creator.displayName,
          "startDate": event.start.date,
          "endDate": event.end.date
        }
      }
          eventsToSend.push(eventData);

    }
      console.log(eventsToSend);
    });
  });
}

// function startCheckingForEvents() {
//   let calendarEvents: String[] = [];
//   let callback = (err: any, res: any) => {
//     if (err) {
//       console.log("The API returned an error: " + err);
//       return;
//     }
//     const events = res.data.items;
//     if (events.length) {
//       console.log("tomorrow:");
//       events.map((event: any) => {
//         const start = event.start.dateTime || event.start.date;
//         calendarEvents.push(`${start} - ${event.summary}`);
//       });
//       console.log(calendarEvents);
//     } else {
//       console.log("No upcoming events found.");
//     }
//   };
//   new GoogleCalendar().listEvents(callback);
// }

setInterval(startCheckingForEvents, 10000);
