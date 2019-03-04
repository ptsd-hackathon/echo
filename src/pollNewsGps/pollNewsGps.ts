import GpsUserDal from "../dal/GpsUserDal"
import { GpsUser } from "../dal/entities/GpsUser";
import CoordUtils from "./CoordUtils"
import Coord from "../dal/entities/Coord"
var Feed = require('rss-to-json');
 
export class YnetMivzak{
    title : String;

}

export class wtf{
    
    getNews = (callback: any) => {
        console.log('going to get news');
        Feed.load('http://www.ynet.co.il/Integration/StoryRss1854.xml', function(err: any, rss: any){
            let news = [];
            rss.items.forEach(element => {
                if(element.title.includes("צה\"ל")){
                    let title = element.title;
                    if (title.includes("רצועה") || title.includes("עזה")){
                        news.push(new GpsUser(title, new Coord("31.455193", "34.373269"), new Date()));
                    }
                }
            });

            callback(null, news);
        });
    }
}

export default class PollNewsGps{

    gpsUserDal = new GpsUserDal();

    constructor(interval : number){
        setInterval(this.poll, interval, new GpsUserDal());
    
    }

    poll(gpsUserDal : GpsUserDal){
        gpsUserDal.getGpsUsers((err: any, gpsUsers: GpsUser[])=>{
            if(err) return;
            if(!gpsUsers) return;
            new wtf().getNews((err:any, news:GpsUser[])=>{
                if(err) return;
                if(!news) return;
                
                news.forEach(yedia => {
                    gpsUsers.forEach(user=>{
                        if(CoordUtils.isInDistance(yedia.Coord, user.Coord, 1)){
                            console.log("User:" + user.User + " is near " + yedia.User);
                        }
                    })
                });
            });
        });
    }


}