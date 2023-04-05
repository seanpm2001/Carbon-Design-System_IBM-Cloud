import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Column, Row } from '@carbon/react'

const baseClass = 'pal--experimental-tile-group';
const ExperimentalTilesGroup = ({ children, id }) => {

  return (
    <Grid condensed className={baseClass} >
        {children.map((child) => <Column sm={4} md={4} lg={4} xlg={4} max={4}>{child}</Column>)}
    </Grid>
  )
}

ExperimentalTilesGroup.propTypes = {
  /*  
    Array of objects populated on tiles
    */
  children: PropTypes.arrayOf(PropTypes.shape({}))
}

ExperimentalTilesGroup.defaultProps = {
  children: undefined,
}

export default ExperimentalTilesGroup;