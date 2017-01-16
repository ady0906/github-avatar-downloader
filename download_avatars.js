var request = require('request');

var GITHUB_USER = "ady0906";
var GITHUB_TOKEN = "5cd13c875f27ee5763bb017f7526c84a5eef9f6f";


console.log('Welcome to the Github Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors", err);
  console.log("Result", err);
});
