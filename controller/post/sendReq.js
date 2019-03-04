var request = require('request');

function PostRequest(postUrl, formJson, headers, callback) {
    request.post({ url: postUrl, form: formJson , headers : headers}, callback);
}

module.exports = {
    PostRequest
}
