import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserRepos, getUserDetails } from '../config/api';
import RepositoryList from '../components/RepositoryList';
import Pagination from '../components/Paginations';

const UserReposPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const reposPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async (page: number) => {
      if (username) {
        try {
          const response = await getUserRepos(username, page);
          setRepositories(response.data);
        } catch (error) {
          console.error('Error fetching repositories:', error);
        }
      }
    };

    const fetchUserDetails = async () => {
      if (username) {
        try {
          const userResponse = await getUserDetails(username);
          const totalRepos = userResponse.data.public_repos;
          setTotalPages(Math.ceil(totalRepos / reposPerPage));
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
    fetchRepos(currentPage);
  }, [username, currentPage]);

  const handleSelectRepository = (repoName: { name: string }) => {
    navigate(`/user/${username}/repo/${repoName.name}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="user-repos-page">
      <h2>Repositories for {username}</h2>
      <RepositoryList
        repositories={repositories}
        onSelectRepository={handleSelectRepository}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserReposPage;
