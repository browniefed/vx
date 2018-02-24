import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { getPrimitives } from '@vx/primitives';

import additionalProps from '../util/additionalProps';

const propTypes = {
  polygon: PropTypes.arrayOf(PropTypes.array),
};

export default function VoronoiPolygon({
  polygon,
  className,
  ...restProps,
}) {
  if (!polygon) return null;
  const { Path } = getPrimitives();

  const data = polygon.data;
  return (
    <Path
      className={cx('vx-voronoi-polygon', className)}
      d={`M${polygon.join('L')}Z`}
      {...additionalProps(restProps, data)}
    />
  );
}

VoronoiPolygon.propTypes = propTypes;
