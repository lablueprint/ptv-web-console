import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const textRouteMaps = [
  {
    text: 'Pending Posts',
    route: ROUTES.FORUM_HOME,
  },
  {
    text: 'Approved Posts',
    route: ROUTES.FORUM_APPROVED_POSTS,
  },
];

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: '1.5em',
  },
  tab: {
    fontSize: theme.typography.pxToRem(20),
    textTransform: 'none',
  },
}));

export default function ForumNavigationTabs() {
  const history = useHistory();
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState((() => {
    switch (history.location.pathname) {
      case ROUTES.FORUM_HOME:
        return 0;
      case ROUTES.FORUM_APPROVED_POSTS:
        return 1;
      default:
        return -1;
    }
  })());

  const handleActiveTabChange = useCallback((_, newActiveTab) => {
    setActiveTab(newActiveTab);
  }, []);

  return (
    <Paper elevation={0}>
      <Tabs
        value={activeTab}
        onChange={handleActiveTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {textRouteMaps.map(({ text, route }) => (
          <Tab
            key={text}
            component={Link}
            to={route}
            classes={{ root: classes.tab }}
            label={text}
          />
        ))}
      </Tabs>
    </Paper>
  );
}
