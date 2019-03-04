import GpsUserModel, { GpsUser } from "./entities/GpsUser";


export default class GpsUserDal{

    constructor(){
    }

    public addGpsUser(GpsUser: GpsUser) : void{
        GpsUserModel.findOne({User: GpsUser.User},(err,found)=>{
            if (err) {console.log("nosuchuser"); return;}
            if(!found){new GpsUserModel(GpsUser).save(); console.log("new user registerd");return;}
            found.Coord = GpsUser.Coord;
            found.LastUpdated = new Date();
            found.save();
            console.log(found);
        });
    }

    public getGpsUsers(callback: any) : void{
        GpsUserModel.find({}, callback);
    }

    
}