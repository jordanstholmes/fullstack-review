import React from 'react';

const RepoListItem = (props) => {
  return (
    <div className='repo-list-item' style={{border: '2px solid black', padding: 5}}>
      <div>{props.repo.userName}</div>
      <a href={props.repo.url}>{props.repo.repoName}</a>
      <div>{props.repo.totalCommits}</div>
    </div>
  );
}


export default RepoListItem;