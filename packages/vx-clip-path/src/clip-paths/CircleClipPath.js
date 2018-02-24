import React from 'react';
import ClipPath from './ClipPath';
import { getPrimitives } from '@vx/primitives';

export default ({
  id,
  cx,
  cy,
  r,
  ...restProps,
}) => {
  const { Circle } = getPrimitives();

  return (<ClipPath id={id}>
    <Circle
      cx={cx}
      cy={cy}
      r={r}
      {...restProps}
    />
  </ClipPath>)
}

