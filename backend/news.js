var config = require('./config')
var key = config.newsapi.API_KEY;
var url = 'https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&' + 'apiKey=' + key;
var req = new Request(url);
fetch(req)
    .then(function(response) {
        //console.log(response.json());
        console.log(response.status());
    });

//console.log(response.status())
