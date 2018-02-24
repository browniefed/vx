import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import additionalProps from '../util/additionalProps';
import { geoGraticule } from 'd3-geo';
import { getPrimitives } from '@vx/primitives';

export default function Graticule({
  graticule,
  lines,
  outline,
  extent,
  extentMajor,
  extentMinor,
  step,
  stepMajor,
  stepMinor,
  precision,
  ...restProps
}) {
  const currGraticule = geoGraticule();

  if (extent) currGraticule.extent(extent);
  if (extentMajor) currGraticule.extentMajor(extentMajor);
  if (extentMinor) currGraticule.extentMinor(extentMinor);
  if (step) currGraticule.step(step);
  if (stepMajor) currGraticule.stepMajor(stepMajor);
  if (stepMinor) currGraticule.stepMinor(stepMinor);
  if (precision) currGraticule.stepMinor(precision);

  const { Path, G } = getPrimitives();

  return (
    <Group className={`vx-geo-graticule`}>
      {graticule &&
        <Path
          d={graticule(currGraticule())}
          fill="none"
          stroke="black"
          {...restProps}
        />}
      {lines &&
        currGraticule.lines().map((line, i) =>
          <G key={i}>
            <Path
              d={lines(line)}
              fill="none"
              stroke="black"
              {...additionalProps(restProps, {
                ...line,
                index: i,
              })}
            />
          </G>,
        )}
      {outline &&
        <Path
          d={outline(currGraticule.outline())}
          fill="none"
          stroke="black"
          {...restProps}
        />}
    </Group>
  );
}

Graticule.propTypes = {
  graticule: PropTypes.func,
  lines: PropTypes.func,
  outline: PropTypes.func,
};
