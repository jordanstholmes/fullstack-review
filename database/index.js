const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoName: String,
  userName: String,
  fullName: String,
  totalCommits: Number,
  url: String,
  githubId: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, callback) => {
  // console.log(repoData);
  const repo = new Repo(repoData);
  repo.save((err, repoDataObj) => {
    if (err) {
      return console.error(err);
    }
    // console.log(`Hopefully I just saved ${repoDataObj}`)
    return repoDataObj;
  });
}

let get = (callback) => {

  Repo.
    find().
    sort('-totalCommits').
    limit(25).
    exec((err, results) => callback(err, results));
};

module.exports.save = save;
module.exports.get = get;