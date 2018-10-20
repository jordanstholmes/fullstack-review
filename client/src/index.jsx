import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: term,
      contentType: 'text/plain'
    })
      .done(() => this.getRepos((err, repos) => {
          this.setState( {repos: repos} );
        })
      )
      .fail(err => console.log(err));
  }

  /*
  What am I trying to do?
  on file load,
  on page load
  on search 
  (I can probably factor the below out)
  I want to request (async) repos
  And THEN re-render with results
  */

  getRepos(callback) {
    $.ajax({
        url: 'http://localhost:1128/repos',
        method: 'GET',
    })
      .done(repos => {
        console.log('INSIDE GETREPOS:', repos);
        callback(null, repos);
      })
      .fail(err => console.log(err))
  }

  render () {

    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));