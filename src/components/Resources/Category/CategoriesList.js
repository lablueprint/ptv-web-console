import dashify from 'dashify';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteCategoryButton from './DeleteCategoryButton';

export default function CategoriesList({ categories }) {
  const categoryItems = categories.map((category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.title}</td>
      <td>{category.description}</td>
      <td><Link to={`resources/${encodeURI(dashify(category.title))}`}>View resources</Link></td>
      <td><DeleteCategoryButton categoryFirestoreId={category.id} /></td>
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
      <tbody>{categoryItems}</tbody>
    </table>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
