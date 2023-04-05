import React from 'react';
import ExperimentalTilesGroup from './ExperimentalTilesGroup';
import ExperimentalTile, {ExperimentalTileHeader, ExperimentalTileDescription} from '../ExperimentalTile';
import './_styles.scss';
import { Tag } from '@carbon/react';
import { Rocket32 } from '@carbon/icons-react';

export default {
  title: 'Components/ExperimentalTilesGroup',
  component: ExperimentalTilesGroup,
};

export const Default = () => {
  return (
  <ExperimentalTilesGroup>
    <ExperimentalTile style={{maxWidth: '400px'}} size='sm' icon={Rocket32} href= '.'>
      <ExperimentalTileHeader type='Product'>
        Title
        </ExperimentalTileHeader>
      <ExperimentalTileDescription>
        A subtitle that expands upon the title and highlights why this world is great.
      </ExperimentalTileDescription>
    </ExperimentalTile>
    <ExperimentalTile style={{maxWidth: '400px'}} size='sm' icon={Rocket32} href= '.'>
      <ExperimentalTileHeader type='Product'>
        Title
        </ExperimentalTileHeader>
      <ExperimentalTileDescription>
        A subtitle that expands upon the title and highlights why this world is great.
      </ExperimentalTileDescription>
    </ExperimentalTile>
  </ExperimentalTilesGroup>);
};

export const Mixed = () => {
  return (
  <>
    <ExperimentalTilesGroup>
      <ExperimentalTile style={{maxWidth: '400px'}} size='lg' icon={Rocket32} href= '.'>
        <ExperimentalTileHeader type='Product'>
          Title
          </ExperimentalTileHeader>
        <ExperimentalTileDescription>
          A subtitle that expands upon the title and highlights why this world is great.
        </ExperimentalTileDescription>
      </ExperimentalTile>
      <ExperimentalTilesGroup>
      <ExperimentalTile style={{maxWidth: '400px'}} size='sm' icon={Rocket32} href= '.'>
        <ExperimentalTileHeader type='Product'>
          Title
          </ExperimentalTileHeader>
        <ExperimentalTileDescription>
          A subtitle that expands upon the title and highlights why this world is great.
        </ExperimentalTileDescription>
      </ExperimentalTile>
      <ExperimentalTile style={{maxWidth: '400px'}} size='sm' icon={Rocket32} href= '.'>
        <ExperimentalTileHeader type='Product'>
          Title
          </ExperimentalTileHeader>
        <ExperimentalTileDescription>
          A subtitle that expands upon the title and highlights why this world is great.
        </ExperimentalTileDescription>
      </ExperimentalTile>
      </ExperimentalTilesGroup>
    </ExperimentalTilesGroup>
  </>
  );
};
