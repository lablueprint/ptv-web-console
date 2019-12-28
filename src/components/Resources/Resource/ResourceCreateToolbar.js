import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'react-admin';
import CreateResourceButton from './CreateResourceButton';

export default function ResourceCreateToolbar({ imagesToUpload, formBodyDelta, ...props }) {
  return (
    <Toolbar {...props}>
      <CreateResourceButton
        imagesToUpload={imagesToUpload}
        formBodyDelta={formBodyDelta}
      />
    </Toolbar>
  );
}

ResourceCreateToolbar.propTypes = {
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

ResourceCreateToolbar.defaultProps = {
  formBodyDelta: null,
};
