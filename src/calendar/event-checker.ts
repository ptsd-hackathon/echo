import { getCalendars } from "./google-calendar-reader";
const CONFIG = require("./calendar-config");

const EVENT_TYPE_ENUM = {
  PERSONAL: 0,
  PUBLIC: 1
};

const nextDayEventsParams = {
  timeMin: new Date().toISOString(),
  timeMax: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  singleEvents: true,
  orderBy: "startTime"
};

export async function startCheckingForEvents() {
  let calendars = await Promise.all(getCalendars());
  let allEvents: any[] = [];
  calendars.forEach(calendar => {
    calendar.forEach((event: any) => {
      allEvents.push({
        summary: event.summary,
        startDate: new Date(event.start.dateTime ? event.start.dateTime : event.start.date),
        endDate: new Date(event.end.dateTime ? event.end.dateTime : event.end.date),
        isPrivate: event.creator.email === CONFIG.primaryCreatorEmail
      });
    });
  });
  return allEvents;
}
