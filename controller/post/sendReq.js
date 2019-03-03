var request = require('request');

function PostRequest(postUrl, formJson, headers) {
    request.post({ url: postUrl, form: formJson , headers : headers}, function (err, res, body) {
        // console.log(JSON.parse(body).text);
        // console.log(res);
        console.log(res.statusCode);
    });
}

module.exports = {
    PostRequest
}