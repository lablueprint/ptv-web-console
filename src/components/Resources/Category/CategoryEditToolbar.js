import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, DeleteButton } from 'react-admin';
import CategoryEditSaveButton from './CategoryEditSaveButton';

export default function CategoryEditToolbar(props) {
  return (
    <Toolbar {...props}>
      <CategoryEditSaveButton />
      <DeleteButton {...props} />
    </Toolbar>
  );
}

CategoryEditToolbar.propTypes = {
  imagesToUpload: PropTypes.objectOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    file: PropTypes.instanceOf(File).isRequired,
  })).isRequired,
};
