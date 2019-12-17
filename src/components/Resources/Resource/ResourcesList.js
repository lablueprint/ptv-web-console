import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DocumentDeleteButton } from '../../Firebase';

export default function ResourcesList({ resources, category }) {
  const resourceItems = resources.map((resource) => (
    <tr key={resource.id}>
      <td>{resource.id}</td>
      <td>{resource.title}</td>
      <td>{resource.description}</td>
      <td><Link to={`${category}/${resource.id}`}>View resource</Link></td>
      <td><DocumentDeleteButton path={`resource_categories/${category}/resources/${resource.id}`} /></td>
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
  category: PropTypes.string.isRequired,
};