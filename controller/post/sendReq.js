var request = require('request');

function PostRequest(postUrl, formJson) {
    request.post({ url: postUrl, form: formJson }, function (err, res, body) {
        console.log(body);
        // console.log(res);
        console.log(res.statusCode);
    });
}

module.exports = {
    PostRequest
}