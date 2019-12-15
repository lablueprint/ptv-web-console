import React from 'react';
import PropTypes from 'prop-types';

export default function ResourcesList({ resources }) {
  const resourceItems = resources.map((resource) => (
    <tr key={resource.id}>
      <td>{resource.title}</td>
      <td>{resource.description}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
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
