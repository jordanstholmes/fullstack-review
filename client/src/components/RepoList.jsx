import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repos With Most Commits </h4>
    <div>There are {props.repos.length} repos.</div>
    {props.repos.length > 0 ? <RepoListItem repo={props.repos[0]} /> : ''}
  </div>
)

export default RepoList;