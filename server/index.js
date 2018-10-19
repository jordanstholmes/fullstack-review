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

  github.getReposInfo(req.body, (err, response, body) => {
    if (err) {
      console.log(err);
    }

    console.log(body);
    // const repos = JSON.parse(body);
    // console.log(repos[0]);

    res.end();
    // res.send(`${repos.length} repos found for user`);
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

