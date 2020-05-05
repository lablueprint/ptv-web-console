import { makeStyles, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const useStyles = makeStyles((theme) => ({
  tab: {
    fontSize: theme.typography.pxToRem(20),
    textTransform: 'none',
  },
}));

export default function ForumApprovedPostBreadcrumbs({ displayName }) {
  const classes = useStyles();
  return (
    <Breadcrumbs>
      <Link
        color="inherit"
        component={RouterLink}
        to={ROUTES.FORUM_APPROVED_POSTS}
        classes={{ root: classes.tab }}
      >
        Approved Posts
      </Link>
      <Typography
        color="textPrimary"
        classes={{ root: classes.tab }}
      >
        Post by&nbsp;
        <strong>{displayName}</strong>
      </Typography>
    </Breadcrumbs>
  );
}
ForumApprovedPostBreadcrumbs.propTypes = {
  displayName: PropTypes.string.isRequired,
};
