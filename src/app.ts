import express from 'express';

export class echo{
    app:any = express();;

    constructor(){
        // this.app = express();
    }    

    start(){
        this.app.listen(3000, () => {
            console.log("Server running on port 3000");
           });
           
           this.app.get("/", function (req:any , res:any){
               res.send("HABATZORET KEN KEN HABATZORET lol\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
           })           
    }

}
 