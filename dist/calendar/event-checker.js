"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_calendar_reader_1 = require("./google-calendar-reader");
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
function startCheckingForEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        let calendars = yield Promise.all(google_calendar_reader_1.getCalendars());
        let allEvents = [];
        calendars.forEach(calendar => {
            calendar.forEach((event) => {
                allEvents.push({
                    summary: event.summary,
                    startDate: new Date(event.start.dateTime ? event.start.dateTime : event.start.date),
                    endDate: new Date(event.end.dateTime ? event.end.dateTime : event.end.date),
                    isPrivate: event.creator.email === CONFIG.primaryCreatorEmail
                });
            });
        });
        return allEvents;
    });
}
exports.startCheckingForEvents = startCheckingForEvents;
//# sourceMappingURL=event-checker.js.map