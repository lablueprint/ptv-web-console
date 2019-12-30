import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, DeleteButton } from 'react-admin';
import ResourceEditSaveButton from './ResourceEditSaveButton';

export default function ResourceEditToolbar({
  imagesToUpload, formBodyDelta, ...props
}) {
  return (
    <Toolbar {...props}>
      <ResourceEditSaveButton
        imagesToUpload={imagesToUpload}
        formBodyDelta={formBodyDelta}
      />
      <DeleteButton {...props} />
    </Toolbar>
  );
}

ResourceEditToolbar.propTypes = {
  imagesToUpload: PropTypes.objectOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    file: PropTypes.instanceOf(File).isRequired,
  })).isRequired,
  formBodyDelta: PropTypes.shape({
    ops: PropTypes.arrayOf(PropTypes.shape({
      insert: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    })),
  }),
};

ResourceEditToolbar.defaultProps = {
  formBodyDelta: null,
};
