var request = require('request');
var fs = require('fs');

var GITHUB_USER = "ady0906";
var GITHUB_TOKEN = "082a33fc158715ca3f872c3a2a33ff0c84479701";

var repoOwner = process.argv[2];
var repoName = process.argv[3];


console.log('Welcome to the Github Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'github-avatar-downloader'
    }
  };

  function downloadImageByUrl(url, filePath) {
    request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
  }

// step 2: data passed to function
  function parsingJSON(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      for (var i = 0; i < info.length; i++) {
        downloadImageByUrl(info[i].avatar_url, './pix/' + info[i].login + '.jpg');
      }
    }
  }

// step 1: getRepoContributors makes request for JSON, getting object
  request.get(options, parsingJSON)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    });
  }


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors", err);
  console.log("Result", err);
});
