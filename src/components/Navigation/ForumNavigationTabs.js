import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import React, { useCallback } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function ForumNavigationTabs() {
  const history = useHistory();
  const setColorByPathname = useCallback((pathname) => (
    history.location.pathname === pathname ? 'textPrimary' : 'inherit'
  ), [history.location.pathname]);

  return (
    <Breadcrumbs>
      {
        [
          ['Pending Posts', ROUTES.FORUM_HOME],
          ['Approved Posts', ROUTES.FORUM_APPROVED_POSTS],
          ['New Post', ROUTES.FORUM_NEW_POST],
        ].map(([text, route]) => (
          <Link
            key={route}
            component={RouterLink}
            color={setColorByPathname(route)}
            to={route}
          >
            {text}
          </Link>
        ))
      }
    </Breadcrumbs>
  );
}
