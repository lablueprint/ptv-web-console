import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteCategoryButton from './DeleteCategoryButton';

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  actionArea: {
    borderRadius: 15,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: () => ({
    minWidth: 150,
    borderRadius: 16,
    boxShadow: 'none',
  }),
}));

// take a look at the classes
export default function CustomCard({
  /* Note for future dev: title and description props are available to use as well */
  imageSrc, id,
}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CardActionArea className={classes.actionArea}>
        <Link to={`resources/${id}`}>
          <Card className={classes.card}>
            <CardMedia
              style={{
                height: '100%',
                paddingTop: '100%', // 16:9,
                marginTop: '30',
              }}
              image={imageSrc}
            />
          </Card>
        </Link>
        {/* <DeleteCategoryButton categoryFirestoreId={id} /> */}
      </CardActionArea>
      <DeleteCategoryButton categoryFirestoreId={id} />
    </div>
  );
}

CustomCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};
