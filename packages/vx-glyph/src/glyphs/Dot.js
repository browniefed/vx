import React from 'react';
import classnames from 'classnames';
import Glyph from './Glyph';
import { getPrimitives } from '@vx/primitives';

export default function GlyphDot({
  top = 0,
  left = 0,
  className,
  children,
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  ...restProps
}) {
  const { Circle } = getPrimitives();
  return (
    <Glyph top={top} left={left}>
      <Circle
        className={classnames('vx-glyph-dot', className)}
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        {...restProps}
      />
      {children}
    </Glyph>
  );
}
