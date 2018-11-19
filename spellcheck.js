var https = require('https');
var jp = require('jsonpath');

module.exports = {
    checkspellings: (query) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                let host = 'api.cognitive.microsoft.com';
                let path = '/bing/v7.0/spellcheck';

                /* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
                let key = '****<Enter your API KEY Here>****';
                let mkt = "en-US";
                let mode = "proof";
                let text = query;
                let query_string = "?mkt=" + mkt + "&mode=" + mode;

                let request_params = {
                    method: 'POST',
                    hostname: host,
                    path: path + query_string,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': text.length + 5,
                        'Ocp-Apim-Subscription-Key': key,

                    }
                };

                let response_handler = function (response) {
                    let body = '';
                    response.on('data', function (d) {
                        body += d;
                    });
                    response.on('end', function () {
                        var response = JSON.parse(body);
                        var suggestions = jp.query(response, '$..suggestions');
                        var spellingSuggestions = jp.query(suggestions, '$..suggestion');
                        spellingSuggestions = spellingSuggestions.join(', ');

                        resolve(spellingSuggestions);
                    });
                    response.on('error', function (e) {
                        console.log('Error: ' + e.message);
                        reject(error);
                    });
                };

                let req = https.request(request_params, response_handler);
                req.write("text=" + text);
                req.end();

            }, 1000);
        });
    }
};