import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../config/api';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import Pagination from '../components/Paginations';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    await fetchUsers(searchQuery, 1);
  };

  const fetchUsers = async (searchQuery: string, page: number) => {
    try {
      setIsLoading(true);
      const response = await searchUsers(searchQuery, page);
      setUsers(response.data.items);
      setTotalCounts(response.data.total_count);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = (user: { login: string }) => {
    navigate(`/user/${user.login}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchUsers(query, page);
    }
  };

  const totalPages = Math.ceil(totalCounts / 10);

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <h3>User List ({totalCounts})</h3>
      {isLoading ? (
        <h5 style={{ textAlign: 'center', margin: '25% auto' }}>Loading...</h5>
      ) : users.length === 0 ? (
        <h5 style={{ textAlign: 'center', margin: '25% auto' }}>
          Nothing Here... You can search with username....
        </h5>
      ) : (
        <>
          <UserList users={users} onSelectUser={handleSelectUser} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
