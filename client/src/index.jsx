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
      .done(() => {
        $.ajax({
        url: 'http://localhost:1128/repos',
        method: 'POST',
        data: term,
        contentType: 'text/plain'
        })
        .done(repos => this.setState({repos: repos}))
        .fail(err => console.log(err))
      })
      .fail(err => console.log(err));
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));