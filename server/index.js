const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const github = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());
app.use(morgan('dev'));

app.post('/repos', function (req, res) {
  const userName = req.body;

  github.getReposByUserName(userName, (err, response, repos) => {
    if (err) {
      console.log(err);
      return;
    }

    repos.forEach((repo) => {

      const repoData = {
        repoName: repo.name,
        userName: repo.owner.login,
        fullName: repo.full_name, 
        url: repo.html_url,
        githubId: repo.id
      };

      github.getCommitsByRepo(repo, (err, response, commits) => {
        if (Array.isArray(commits)) {
          repoData.totalCommits = commits.length;
        } else if (commits.message === 'Git Repository is empty.') {
          repoData.totalCommits = 0;
        }

        db.save(repoData);
      });

    });

    res.end();
  });


  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

