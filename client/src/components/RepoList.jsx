import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repos With Most Commits </h4>
    <div>There are {props.repos.length} repos.</div>
    {props.repos.map( repo => <RepoListItem key={repo._id}repo={repo} /> )}
  </div>
)

export default RepoList;