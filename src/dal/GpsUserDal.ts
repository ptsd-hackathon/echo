import GpsUserModel, { GpsUser } from "./entities/GpsUser";


export default class GpsUserDal{

    constructor(){
    }

    public addGpsUser(GpsUser: GpsUser) : void{
        GpsUserModel.findOne({User: GpsUser.User},(err,found)=>{
            if (err) {console.log("nosuchuser"); return;}
            if(!found){console.log("nosuchuser"); return;}
            found.Coord = GpsUser.Coord;
            found.save();
            console.log(found);
        });
        // new GpsUserModel({_id:"test"}).save();
    }

    
}