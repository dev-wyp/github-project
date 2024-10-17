import React from 'react';

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  watchers_count: number;
}

interface RepositoryListProps {
  repositories: Repository[];
  onSelectRepository: (repo: Repository) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  onSelectRepository,
}) => {
  return (
    <div className="repo-list">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="repo-item"
          onClick={() => onSelectRepository(repo)}
        >
          <span>{repo.name}</span>
          <span>
            {repo.stargazers_count} ★ {repo.watchers_count} 👁️
          </span>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
