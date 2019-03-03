var express = require("express");
var news = require("./controller/news/news");
const NEWS_CONSTS = require('../../data-const/news-consts');
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", function (req, res){
    res.send("HABATZORET KEN KEN HABATZORET\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
})

app.get("/newsJson", function(req, res){
    news.TopHeadlines(NEWS_CONSTS.category, NEWS_CONSTS.language, NEWS_CONSTS.country, next => {
        res.send(news.ReturnedContent(next));
        }
    );
})