import React, { useEffect, useState } from 'react';
import { fetchUsers, searchUsers } from '../services/api';
import Pagination from '../components/Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]); // Stores user data
  const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [searchQuery, setSearchQuery] = useState(''); // Stores the search input
  const [isSearching, setIsSearching] = useState(false); // Tracks if a search is active

  // Fetch paginated users when no search is active
  useEffect(() => {
    if (!isSearching) {
      fetchUsers(currentPage, 10).then((response) => {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      });
    }
  }, [currentPage, isSearching]);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true); // Indicate that we are in search mode
      searchUsers(searchQuery).then((response) => {
        setUsers(response.data);
        setTotalPages(0); // Hide pagination during search
      });
    } else {
      setIsSearching(false); // Exit search mode if the query is cleared
      setCurrentPage(1); // Reset to the first page
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Search Input */}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name or email"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* User List */}
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {!isSearching && totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default UserList;

