import GpsUserModel, { GpsUser } from "./entities/GpsUser";


export default class GpsUserDal{

    constructor(){
    }

    public addGpsUser(GpsUser: GpsUser) : void{
        new GpsUserModel(GpsUser).save();
    }

    
}