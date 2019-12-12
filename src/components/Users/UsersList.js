import PropTypes from 'prop-types';
import React from 'react';

export default function UsersList(props) {
  const { users } = props;
  const userData = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>{userData}</tbody>
    </table>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
