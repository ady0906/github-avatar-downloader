//defining global variables
var request = require('request');
var fs = require('fs');
var GITHUB_USER = "ady0906";
var GITHUB_TOKEN = "082a33fc158715ca3f872c3a2a33ff0c84479701";
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the Github Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {

// defining local variables
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'github-avatar-downloader'
    }
  };

// function used to write image files, logging status codes to confirm everything is functioning correctly
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

// step 2: iterate through newly created JSON object to download images by URL and send them over to a designated file nested inside project directory
  function parsingJSON(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      for (var i = 0; i < info.length; i++) {
        downloadImageByUrl(info[i].avatar_url, './pix/' + info[i].login + '.jpg');
      }
    }
  }

// step 1: if arguments valid, getRepoContributors makes request for JSON
if (!repoOwner || !repoName) {
  throw new Error ('You need a name and owner for your repo!');
}
else {
  request.get(options, parsingJSON)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    });
  }
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors", err);
  console.log("Result", err);
});
