export default class EventUser{
    User: string;
    EventId:number;
    Date:Date;

    constructor(User: string, EventId: number, Date: Date){
        this.User = User;
        this.EventId = EventId;
        this.Date = Date;
    }
} 