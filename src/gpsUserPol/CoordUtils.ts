import Coord from "../dal/entities/Coord";

export default abstract class CoordUtils{
    public static isInDistance(CoordA: Coord, CoordB: Coord, distance: number) : boolean{
        let dist = Math.sqrt(Math.pow(parseFloat(CoordA.Lat) - parseFloat(CoordB.Lat), 2) + Math.pow(parseFloat(CoordA.Long) - parseFloat(CoordB.Long), 2));
        // console.log(JSON.stringify(CoordA) + " " + JSON.stringify(CoordB) + " " + dist);
        if(dist < distance){
            return true;
        }

        return false;
    }
}