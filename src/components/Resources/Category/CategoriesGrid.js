import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import CustomCard from './CustomCard';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

export default function CategoriesGrid({ categories }) {
  const gridStyles = useStyles();
  const spacing = 4;
  const categoryItems = categories.map((category) => (
    <Grid item>
      <CustomCard
        id={category.id}
        title={category.title}
        imageSrc={category.thumbnail.src}
        description={category.description}
      />
    </Grid>
  ));

  return (
    <div>
      <Grid classes={gridStyles} container spacing={spacing}>
        {categoryItems}
      </Grid>
    </div>
  );
}

CategoriesGrid.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,

};
