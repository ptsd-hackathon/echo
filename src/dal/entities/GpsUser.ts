import mongoose from "mongoose"
import Coord from "./Coord"

export interface ICoord {
    Lat: string,
    Long: string
}

export interface IGpsUser extends mongoose.Document {
    User: string; 
    Coord: ICoord;
    LastUpdated: Date;
  };

  
export const CoordSchema = new mongoose.Schema({
    Lat: String,
    Long: String
})

export const GpsUserSchema = new mongoose.Schema({
  User: {type:String, required: true},
  Coord: {type:CoordSchema, required: true},
  LastUpdated: {type:Date, required: true}
});

export class GpsUser {
  User: string
  Coord: ICoord
  LastUpdated: Date;
  
  constructor(User: string, Coord: Coord, LastUpdated: Date){
    this.User = User;
    this.Coord = Coord;
    this.LastUpdated = LastUpdated;
  }
}
  
const GpsUserModel = mongoose.model<IGpsUser>('GpsUsers', GpsUserSchema);
export default GpsUserModel;