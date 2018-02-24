import React from 'react';
import cx from 'classnames';
import { symbol, symbolStar } from 'd3-shape';
import Glyph from './Glyph';
import additionalProps from '../util/additionalProps';
import { getPrimitives } from '@vx/primitives';

export default function GlyphStar({
  children,
  className,
  top,
  left,
  size,
  ...restProps
}) {
  const { Path } = getPrimitives();
  const path = symbol();
  path.type(symbolStar);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <Path
        className={cx('vx-glyph-star', className)}
        d={path()}
        {...additionalProps(restProps)}
      />
      {children}
    </Glyph>
  );
}
