const request = require('request');
const config = require('../config.js');
const _ = require('underscore');

let getCommits = (repo, callback) => {
  var url = repo.commits_url;
  if (url) {
    url = url.slice(0, url.length - 6);
  }


  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
    }
  };

  

  request(options, (err, response, body) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(null, null, JSON.parse(body));
  });
}

let getReposInfo = (userName, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    }
  };

  request(options, (err, response, repos) => {
    if (err) {
      console.log(err);
      return;
    }

    repos = JSON.parse(repos);

    getCommits(repos[3], (err, response, body) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(null, null, body);
    }); 
  });
};

/*
Decided to abandon trying to get all commits.
Leaving the two functions below for the time being.
*/


/*
Couldn't get the function below working quickly enough.
Leaving it be for the time being
*/

let getCommitsForAll = (repos, callback) => {
  var commitsJSON = repos.forEach(repo => {
    var url = repo.commits_url; //has SHA-1 at the end
    url = url.slice(0, url.length - 6); //remove SHA-1

    getCommits(url, (err, response, body) => {
      if (err) {
        console.log(err);
      }
      console.log(body);
    });
  });
};
  


module.exports.getReposInfo = getReposInfo;
module.exports.getCommits = getCommits;
module.exports.getCommitsForAll = getCommits;

