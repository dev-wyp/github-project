import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRepoIssues, createIssue } from '../config/api';
import IssueList from '../components/IssueList';
import NewIssueModal from '../components/NewIssueModal';
import Pagination from '../components/Paginations';

const RepoIssuesPage: React.FC = () => {
  const { username, repoName } = useParams<{
    username: string;
    repoName: string;
  }>();
  const [issues, setIssues] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const issuesPerPage = 10;

  useEffect(() => {
    const fetchIssues = async () => {
      if (username && repoName) {
        try {
          const response = await getRepoIssues(username, repoName, currentPage);
          setIssues(response.data);

          const totalCount =
            response.headers['x-total-count'] || response.data.length;
          setTotalPages(Math.ceil(totalCount / issuesPerPage));
        } catch (error) {
          console.error('Error fetching issues:', error);
        }
      }
    };

    fetchIssues();
  }, [username, repoName, currentPage]);

  const handleCreateIssue = async (title: string, description: string) => {
    if (username && repoName) {
      try {
        await createIssue(username, repoName, { title, body: description });
        const response = await getRepoIssues(username, repoName, currentPage);
        setIssues(response.data);
      } catch (error) {
        console.error('Error creating issue:', error);
      } finally {
        setModalOpen(false);
      }
    }
  };

  return (
    <div className="repo-issues-page">
      <h2>Issues for {repoName}</h2>
      <NewIssueModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateIssue}
      />
      <IssueList issues={issues} onOpenNewIssue={() => setModalOpen(true)} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RepoIssuesPage;
