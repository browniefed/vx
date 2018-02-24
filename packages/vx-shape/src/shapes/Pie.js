import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import additionalProps from '../util/additionalProps';
import { getPrimitives } from '@vx/primitives';

export default function Pie({
  className = '',
  top = 0,
  left = 0,
  data,
  centroid,
  innerRadius = 0,
  outerRadius,
  cornerRadius,
  startAngle = 0,
  endAngle,
  padAngle,
  padRadius,
  pieSort,
  pieValue,
  ...restProps
}) {
  const { Path, G } = getPrimitives();
  
  const path = d3Arc();
  path.innerRadius(innerRadius);
  if (outerRadius) path.outerRadius(outerRadius);
  if (cornerRadius) path.cornerRadius(cornerRadius);
  if (padRadius) path.padRadius(padRadius);
  const pie = d3Pie();
  if (pieSort) pie.sort(pieSort);
  if (pieValue) pie.value(pieValue);
  if (padAngle) pie.padAngle(padAngle);
  const arcs = pie(data);
  return (
    <Group className="vx-pie-arcs-group" top={top} left={left}>
      {arcs.map((arc, i) => {
        let c;
        if (centroid) c = path.centroid(arc);
        return (
          <G key={`pie-arc-${i}`}>
            <Path
              className={cx('vx-pie-arc', className)}
              d={path(arc)}
              {...additionalProps(restProps, {
                ...arc,
                index: i,
                centroid: c,
              })}
            />
            {centroid && centroid(c, arc)}
          </G>
        );
      })}
    </Group>
  );
}
