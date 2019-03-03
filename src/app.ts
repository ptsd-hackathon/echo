import express from 'express';
import {getAddresFromCity} from './addressConverter/addressConverter'

export class echo{
    app:any = express();;

    constructor(){
    }    

    start(){
        this.app.listen(3000, async () => {
            let t = new getAddresFromCity();
            t.get('Tel-Aviv',(err:any,response:any, body:any) => {
                var bodyasjson = JSON.parse(body);
                let res = bodyasjson.results[0].geometry.location;
                })
           });
           
           this.app.get("/", function (req:any , res:any){
               res.send("HABATZORET KEN KEN HABATZORET\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
           })           
    }

}
 