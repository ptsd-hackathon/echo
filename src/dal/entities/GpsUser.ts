import { Coord } from "./Coord";

export class GpsUser{
    User : string;
    Coordination: Coord;

    constructor(User: string, Coordination: Coord){
        this.User = User;
        this.Coordination = Coordination;
    }
}