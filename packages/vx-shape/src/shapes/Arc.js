import React from 'react';
import cx from 'classnames';
import { arc as d3Arc } from 'd3-shape';
import additionalProps from '../util/additionalProps';
import { getPrimitives } from '@vx/primitives';

export default function Arc({
  className,
  data,
  centroid,
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  ...restProps
}) {
  const { Path } = getPrimitives();

  const arc = d3Arc();
  if (centroid) arc.centroid(centroid);
  if (innerRadius) arc.innerRadius(innerRadius);
  if (outerRadius) arc.outerRadius(outerRadius);
  if (cornerRadius) arc.cornerRadius(cornerRadius);
  if (startAngle) arc.startAngle(startAngle);
  if (endAngle) arc.endAngle(endAngle);
  if (padAngle) arc.padAngle(padAngle);
  if (padRadius) arc.padRadius(padRadius);
  return (
    <Path
      className={cx('vx-arc', className)}
      d={arc(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
