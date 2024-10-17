import React from 'react';

interface Issue {
  id: number;
  title: string;
  user: { login: string };
  created_at: string;
}

interface IssueListProps {
  issues: Issue[];
  onOpenNewIssue: () => void;
}

const IssueList: React.FC<IssueListProps> = ({ issues, onOpenNewIssue }) => {
  return (
    <div className="issue-list">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Issues</h2>
        <button
          onClick={onOpenNewIssue}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            marginLeft: 10,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          New Issue
        </button>
      </div>
      {issues.map((issue) => (
        <div key={issue.id} className="issue-item">
          <span>{issue.title}</span>
          <span>by {issue.user.login}</span>
        </div>
      ))}
    </div>
  );
};

export default IssueList;
