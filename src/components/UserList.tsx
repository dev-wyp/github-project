import React from 'react';

interface User {
  id: number;
  avatar_url: string;
  login: string;
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user.id}
          className="user-card"
          onClick={() => onSelectUser(user)}
        >
          <div className="user-info">
            <img src={user.avatar_url} alt={user.login} />
            <span>{user.login}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
