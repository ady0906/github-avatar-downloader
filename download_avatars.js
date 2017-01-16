var request = require('request');

var GITHUB_USER = "ady0906";
var GITHUB_TOKEN = "082a33fc158715ca3f872c3a2a33ff0c84479701";


console.log('Welcome to the Github Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'github-avatar-downloader'
    }
  };

  // console.log(requestURL);

  function parsingJSON(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
    }
  }

  request.get(options, parsingJSON)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);

      //console.log('response', response);
    });
  }


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors", err);
  console.log("Result", err);
});
