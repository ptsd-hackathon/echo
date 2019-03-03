import express from 'express';
import  mongoose  from 'mongoose';
import GpsUserDal  from './dal/GpsUserDal';
var config = require("../config.json")
import bodyParser from "body-parser";

import {getAddresFromCity} from './addressConverter/addressConverter'

export class echo{
    app:any = express();

    constructor(){
        mongoose.connect(config.mongo, {useNewUrlParser: true});
        this.initSchema();
    }    

    initSchema(){
    }

    start(){
        this.app.use(bodyParser.json());
        this.app.listen(3000, () => {
            console.log("Server running on port 3000");
        this.app.listen(3000, async () => {
            let t = new getAddresFromCity();
            t.get('Tel-Aviv',(err:any,response:any, body:any) => {
                var bodyasjson = JSON.parse(body);
                let res = bodyasjson.results[0].geometry.location;
                })
           });
           
           this.app.get("/", function (req:any , res:any){
               res.send("HABATZORET KEN KEN HABATZORET lol\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
           });

           this.app.post("/updateGpsUser", function(req:any, res:any){
                new GpsUserDal().addGpsUser(req.body);
                res.sendStatus(200);
           });
        });
    }
}
 