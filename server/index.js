const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const github = require('../helpers/github.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());
app.use(morgan('dev'));

app.post('/repos', function (req, res) {
  console.log(req.body);
  github.getReposByUsername(req.body, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    const repos = JSON.parse(body);
    var commitsURL = repos[0].commits_url;
    commitsURL = commitsURL.slice(0, commitsURL.length - 6);

    github.getCommits(commitsURL, (err, response, body) => {
      if (err) {
        console.log(err);
      }
      console.log(JSON.parse(body));
    });
    console.log(github)

    // console.log(JSON.parse(body));
  });


  res.send('Sup, from the server');
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

