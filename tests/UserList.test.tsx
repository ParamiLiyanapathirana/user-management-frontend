import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';
import { fetchUsers } from '../services/api';

jest.mock('../services/api');

describe('UserList Component', () => {
  it('should render a list of users', async () => {
    (fetchUsers as jest.Mock).mockResolvedValueOnce({
      data: {
        users: [
          { _id: '1', name: 'John Doe', email: 'john@example.com' },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        ],
        totalPages: 1,
      },
    });

    render(<UserList />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('should search for users when search query is entered', async () => {
    // Mock search API response
    (fetchUsers as jest.Mock).mockResolvedValueOnce({
      data: [
        { _id: '1', name: 'John Doe', email: 'john@example.com' },
      ],
    });

    render(<UserList />);
    const searchInput = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });
});
