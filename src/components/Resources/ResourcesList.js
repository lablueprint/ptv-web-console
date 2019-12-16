import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

export default function ResourcesList({ resources }) {
  const { category } = useParams();
  const resourceItems = resources.map((resource) => (
    <tr key={resource.id}>
      <td>{resource.id}</td>
      <td>{resource.title}</td>
      <td>{resource.description}</td>
      <td><Link to={`${category}/${resource.id}`}>View resource</Link></td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {resourceItems}
      </tbody>
    </table>
  );
}

ResourcesList.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
