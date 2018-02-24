import React from 'react';
import cx from 'classnames';
import { symbol, symbolWye } from 'd3-shape';
import Glyph from './Glyph';
import additionalProps from '../util/additionalProps';
import { getPrimitives } from '@vx/primitives';

export default function GlyphWye({
  children,
  className,
  top,
  left,
  size,
  ...restProps
}) {
  const { Path } = getPrimitives();
  const path = symbol();
  path.type(symbolWye);
  if (size) path.size(size);
  return (
    <Glyph top={top} left={left}>
      <Path
        className={cx('vx-glyph-wye', className)}
        d={path()}
        {...additionalProps(restProps)}
      />
      {children}
    </Glyph>
  );
}
