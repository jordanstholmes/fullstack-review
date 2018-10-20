const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  totalCommits: Number,
  url: String,
  githubId: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, callback) => {
  console.log(repoData);
  const repo = new Repo(repoData);
  repo.save((err, repoDataObj) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Hopefully I just saved ${repoDataObj}`)
    return repoDataObj;
  });
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;