import Coord from "../dal/entities/Coord";

export default abstract class CoordUtils{
    public static isInDistance(CoordA: Coord, CoordB: Coord, distance: number) : boolean{
        
        if(Math.abs(parseFloat(CoordA.Lat) - parseFloat(CoordB.Lat)) <= distance &&
        Math.abs(parseFloat(CoordA.Long) - parseFloat(CoordB.Long)) < distance){
            return true;
        }

        return false;
    }
}