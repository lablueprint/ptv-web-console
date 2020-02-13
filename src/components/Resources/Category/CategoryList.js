import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { List, useRedirect } from 'react-admin';

function CategoryGrid({ ids, data }) {
  const redirect = useRedirect();

  return (
    ids.map((id) => (
      <Card key={id} style={{ ...styles.cardStyle, backgroundImage: `url(${data[id].thumbnail.src})` }}>
        <CardActionArea
          style={styles.cardActionAreaStyle}
          onClick={() => redirect(`/resource_categories/${id}/show`)}
        >
          <CardContent style={styles.cardContentStyle}>
            {data[id].title}
          </CardContent>
        </CardActionArea>
      </Card>
    ))
  );
}

export default function CategoryList(props) {
  return (
    <List {...props} title="Resource Categories">
      <CategoryGrid />
    </List>
  );
}

const styles = {
  cardStyle: {
    width: 300,
    height: 300,
    borderRadius: 0,
    display: 'inline-block',
    verticalAlign: 'top',
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.4)',
    backgroundSize: 'cover',
  },
  cardContentStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: '2em',
  },
  cardActionAreaStyle: {
    height: '100%',
  },
};
