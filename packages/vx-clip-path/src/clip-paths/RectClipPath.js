import React from 'react';
import ClipPath from './ClipPath';
import { getPrimitives } from '@vx/primitives';

export default ({
  id,
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  ...restProps,
}) => {
  const { Rect } = getPrimitives();

  return (
    <ClipPath id={id}>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        {...restProps}
      />
    </ClipPath>
  )
}
